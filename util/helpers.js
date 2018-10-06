const debug = require('debug')('hacktoberfest2018:server');

const afterPush = err => {
  if (err) {
    debug('[FIREBASE] Error while pushing new entry: ' + err, 1);
  } else {
    debug('[FIREBASE] DB Push Success');
  }
};

module.exports = {
  afterPush
};
