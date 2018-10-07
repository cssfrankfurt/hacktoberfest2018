const express = require('express');
const router = express.Router();
const debug = require('debug')('hacktoberfest2018:server');
const axios = require('axios');

const { afterPush } = require('../util/helpers');

const key = process.env.GITHUB_ID;
const secret = process.env.GITHUB_SECRET;
const env = process.env.NODE_ENV || 'dev';
const rootURL =
  env === 'dev' ? 'http://localhost:5000' : 'https://hacktoberfestffm.de';
const callbackUrl = rootURL + '/api/callback';

let octokit = null;
let firebase = null;
let usersDB = null;

/**
 * GET Login
 */
router.get('/login', (req, res, next) => {
  debug('[AUTH] Redirecting to Github Authorization');
  res.send(
    'https://github.com/login/oauth/authorize?' +
      `client_id=${key}&scope=read:user,repo:status` +
      `&redirect_uri=${callbackUrl}`
  );
});

/**
 * GET Callback
 */
router.get('/callback', async (req, res, next) => {
  const code = req.query.code;

  let accessToken = null;
  debug("[AUTH] Getting user's access token");

  await axios
    .post('https://github.com/login/oauth/access_token', {
      client_id: key,
      client_secret: secret,
      code: code
    })
    .then(response => {
      accessToken = response.data.split('&')[0].split('token=')[1];
      octokit.authenticate({
        type: 'oauth',
        token: accessToken
      });
    });

  debug("[AUTH] Got user's access token");

  const userData = await octokit.users.get({});
  const login = userData.data.login;

  const newDBUser = {
    login,
    accessToken
  };
  let userEntry = usersDB.push(newDBUser, afterPush);
  debug('Firebase generated key: ' + userEntry.key);

  res.redirect(rootURL);
});

/**
 * GET users + PR data
 */
router.get('/data', async (req, res, next) => {
  const gotAll = async data => {
    let users = await data.val();
    users = Object.values(users);

    if (users) {
      for (let i = 0; i < users.length; i++) {
        octokit.authenticate({
          type: 'oauth',
          token: [users[i].accessToken]
        });
        const result = await octokit.activity.getEventsForUser({
          username: [users[i].login],
          per_page: 100
        });
        let filteredData = result.data.filter(
          obj =>
            obj.type === 'PullRequestEvent' &&
            obj.payload.action === 'opened' &&
            obj.payload.created_at
        );
        res.send(filteredData);
      }
    } else {
      res.json({
        status: 500,
        err: 'Error while getting users'
      });
    }
  };

  const errData = error => {
    debug('Something went wrong.');
    debug(error);
    res.json({
      status: 500,
      err: 'Error while getting user data'
    });
  };

  await usersDB.on('value', gotAll, errData);
});

function getRouter(adminRef, octokitRef) {
  firebase = adminRef;
  usersDB = firebase.ref('users');
  octokit = octokitRef;

  return router;
}

module.exports = getRouter;
