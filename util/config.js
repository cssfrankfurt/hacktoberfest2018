const projectId = process.env.FIREBASE_PROJECTID;
const emailPrefix = process.env.FIREBASE_CLIENTEMAIL;
const key = process.env.FIREBASE_KEY.replace(/\\n/g, '\n');

function initConfigs (firebaseAdmin) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId,
      clientEmail: `${emailPrefix}@${projectId}.iam.gserviceaccount.com`,
      privateKey: `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----\n`
    }),
    databaseURL: `https://${projectId}.firebaseio.com`
  });
}

module.exports = initConfigs;
