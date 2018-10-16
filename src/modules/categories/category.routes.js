import { Router } from 'express';
import validate from 'express-validation';

import * as categoriesController from './category.controllers';
import * as productsController from '../products/product.controllers';
import categoriesValidation from './category.validations';
import { authLocal, authJwt } from '../../services/auth.service';

const routes = new Router();
routes.post('/', authJwt, validate(categoriesValidation.createCategories), categoriesController.createCategory);
routes.get('/', authJwt, categoriesController.getCategories);
routes.get('/:id', authJwt, categoriesController.getById);
routes.get('/:id/products', authJwt, productsController.getProductByCategoryId);
routes.patch('/:id', authJwt, validate(categoriesValidation.updateCategories), categoriesController.updateCategory);
routes.delete('/:id', authJwt, categoriesController.deleteCategory);

export default routes;
