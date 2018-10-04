/* eslint-disable no-console */
import express from 'express';
import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';

import apiRoputes from './modules';

import cloudinary from 'cloudinary';

import * as cloudinaryConfig from './config/cloudinary';

const app = express();
middlewaresConfig(app);

// configure cloudinary
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudinaryName,
  api_key: cloudinaryConfig.cloudinaryApiKey,
  api_secret: cloudinaryConfig.cloudinaryApiSecret,
});

app.get('/', (req, res) => {
  res.send('Hello HungTA.');
});

apiRoputes(app);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
            Server running on port: ${constants.PORT}
            ------------
            Running on ${process.env.NODE_ENV}
            ------------
            Make something great !
        `);
  }
});
