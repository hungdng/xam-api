import { Router } from 'express';
import validate from 'express-validation';

import * as productsController from './product.controllers';
import productValidations from './product.validations';

const routes = new Router();
routes.post('/', validate(productValidations.createProduct), productsController.createProduct);
routes.get('/', productsController.getProducts);
routes.get('/:id', productsController.getProductById);
routes.put('/:id', productsController.updateProduct);
routes.delete('/:id', productsController.deleteProduct);

export default routes;
