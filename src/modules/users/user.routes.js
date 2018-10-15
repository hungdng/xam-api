import { Router } from 'express';
import validate from 'express-validation';

import { authLocal } from '../../services/auth.service';
import * as userController from './user.controller';
import userValidation from './user.validations';

const routes = new Router();
routes.post('/', validate(userValidation.signup), userController.signUp);
routes.get('/:email', userController.getByEmail);
routes.post('/login', authLocal, userController.login);
export default routes;
