import { Router } from 'express';

import * as menuController from './menu.controllers';
import { authJwt } from '../../services/auth.service';

const routes = new Router();
routes.post('/', authJwt, menuController.createMenu);
routes.get('/', authJwt, menuController.getMenus);
routes.get('/:id', authJwt, menuController.getMenuById);
routes.put('/:id', authJwt, menuController.updateMenu);
routes.delete('/:id', authJwt, menuController.deleteMenu);

export default routes;
