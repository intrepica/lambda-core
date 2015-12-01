AWS.config.region = 'us-east-1';

const load = (callback) => {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.IDENTITY_POOLID
  });

  AWS.config.credentials.get(callback);
};

export default {
  load
};
