const debug = require('debug')('hacktoberfest2018:server');

const afterPush = err => {
  if (err) {
    debug('[FIREBASE] Error while pushing new entry: ' + err, 1);
  } else {
    debug('[FIREBASE] DB Push Success');
  }
};

const paginate = async (octokit, method, username) => {
  let response = await method({ per_page: 100, username });
  let { data } = response;
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response);
    if (
      new Date(response.data[response.data.length - 1].created_at) <
      new Date('2018-10-01')
    ) {
      data = data.concat(response.data);
      break;
    }
    data = data.concat(response.data);
  }
  return data;
};

module.exports = {
  afterPush,
  paginate
};
