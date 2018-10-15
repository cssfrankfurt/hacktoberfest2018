const express = require('express');
const router = express.Router();
const debug = require('debug')('hacktoberfest2018:server');
const axios = require('axios');

const { afterPush, paginate } = require('../util/helpers');

const key = process.env.GITHUB_ID;
const secret = process.env.GITHUB_SECRET;
const env = process.env.NODE_ENV || 'dev';
const rootURL =
  env === 'dev' ? 'http://localhost:5000' : 'https://hacktoberfestffm.de';
const callbackUrl = rootURL + '/api/callback';

let app = null;

let octokit = null;
let firebase = null;
let database = null;

let usersDB = null;
let dataDB = null;
let lastFetchedDB = null;

let lastfetched = new Date();
/**
 * GET Login
 */
router.get('/login', (req, res, next) => {
  debug('[AUTH] Redirecting to Github Authorization');
  res.send(
    'https://github.com/login/oauth/authorize?' +
      `client_id=${key}&scope=read:user` +
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

  await usersDB.on(
    'value',
    data => {
      let users = data.val() || {};
      if (Object.values(users).some(u => u.login === login)) {
        debug('User already in database');
      } else {
        let newDBUser = {
          login,
          accessToken
        };
        let userEntry = usersDB.push(newDBUser, afterPush);
        debug('Firebase generated key: ' + userEntry.key);
      }
    },
    error => {
      debug('Something went wrong.');
      debug(error);
      res.json({
        status: 500,
        err: 'Error while getting user data'
      });
    }
  );

  res.redirect(rootURL + '/leaderboard');
});

/**
 * GET users + PR data
 */
router.get('/data', async (req, res, next) => {
  const gotAll = async data => {
    let users = await data.val() || {};
    users = Object.values(users);

    if (Math.floor((new Date() - lastfetched) / 1000 / 60) > 5) {
      if (users) {
        let prsPerUser = {};
        for (let i = 0; i < users.length; i++) {
          prsPerUser[users[i].login] = {
            prs: 0
          };
          try {
            octokit.authenticate({
              type: 'oauth',
              token: [users[i].accessToken]
            });
            const result = await paginate(
              octokit,
              octokit.activity.getEventsForUser,
              [users[i].login]
            );
            result.forEach(obj => {
              if (
                obj.type === 'PullRequestEvent' &&
                obj.payload.action === 'opened' &&
                new Date(obj.payload.pull_request.created_at) >
                  new Date('2018-10-01')
              ) {
                prsPerUser[users[i].login] = {
                  latestPr:
                    prsPerUser[users[i].login].latestPr ||
                    obj.payload.pull_request.created_at
                      .split('T')[1]
                      .split('.')[0],
                  latestProject:
                    prsPerUser[users[i].login].latestProject || obj.repo.name,
                  prs: prsPerUser[users[i].login].prs + 1
                };
              }
            });
          } catch (err) {
            console.error(err);
            console.error(users[i].login, users[i].accessToken);
          }
        }

        let data = [];
        for (let username in prsPerUser) {
          if (!prsPerUser.hasOwnProperty(username)) continue; // skip prototype properties

          data.push({
            name: username,
            prs: prsPerUser[username].prs,
            latestPr: prsPerUser[username].latestPr || 'N/A',
            latestProject: prsPerUser[username].latestProject || 'N/A'
          });
        }

        database.child('data').set(data);
        database.child('lastfetched').set(new Date().toISOString());

        let io = app.get('io');
        io.emit('database update', data);

        res.send(data);
      } else {
        res.json({
          status: 500,
          err: 'Error while getting users'
        });
      }
    } else {
      await dataDB.on('value', async data => res.send(data.val()));
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

  await lastFetchedDB.on(
    'value',
    async data => {
      lastfetched = new Date(data.val());
    },
    errData
  );

  await usersDB.on('value', gotAll, errData);
});

function getRouter(adminRef, octokitRef, appRef) {
  app = appRef;
  firebase = adminRef;
  usersDB = firebase.ref('users');
  lastFetchedDB = firebase.ref('lastfetched');
  dataDB = firebase.ref('data');
  database = firebase.ref('/');
  octokit = octokitRef;

  return router;
}

module.exports = getRouter;
