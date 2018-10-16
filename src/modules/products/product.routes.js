import { Router } from 'express';
import validate from 'express-validation';

import * as productsController from './product.controllers';
import productValidations from './product.validations';
import { authLocal, authJwt } from '../../services/auth.service';

const routes = new Router();
routes.post('/',authJwt, validate(productValidations.createProduct), productsController.createProduct);
routes.get('/', authJwt, productsController.getProducts);
routes.get('/:id', authJwt, productsController.getProductById);
routes.put('/:id', authJwt, productsController.updateProduct);
routes.delete('/:id', authJwt, productsController.deleteProduct);

export default routes;
