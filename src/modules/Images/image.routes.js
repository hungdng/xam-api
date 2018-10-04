import { Router } from 'express';

import * as imagesController from './image.controllers';

const multer = require('multer');

const storage = multer.memoryStorage();
const parser = multer({ storage });

const routes = new Router();
routes.post('/', parser.array('images', 10), imagesController.uploadImages);

export default routes;
