const devConfig = {
  MONGO_URL: 'mongodb://hungtran:Abc123456@ds119663.mlab.com:19663/shopdb',
  JWT_SECRET: 'abcxyz',
};

const testConfig = {
  // MONGO_URL: 'mongodb://localhost/shopdb',
};

const prodConfig = {
  // MONGO_URL: 'mongodb://localhost/shopdb',
  MONGO_URL: 'mongodb://hungtran:Abc123456@ds119663.mlab.com:19663/shopdb',
  JWT_SECRET: 'abcxyz',
};

const defaultConfig = {
  PORT: process.env.PORT || 80,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
