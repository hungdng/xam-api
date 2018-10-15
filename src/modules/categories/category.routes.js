import { Router } from 'express';
import validate from 'express-validation';

import * as categoriesController from './category.controllers';
import * as productsController from '../products/product.controllers';
import categoriesValidation from './category.validations';
import { authLocal } from '../../services/auth.service';

const routes = new Router();
routes.post('/', validate(categoriesValidation.createCategories), categoriesController.createCategory);
routes.get('/', authLocal, categoriesController.getCategories);
routes.get('/:id', categoriesController.getById);
routes.get('/:id/products', productsController.getProductByCategoryId);
routes.patch('/:id', validate(categoriesValidation.updateCategories), categoriesController.updateCategory);
routes.delete('/:id', categoriesController.deleteCategory);

export default routes;
