import HTTPStatus from 'http-status';
import Menu from './menu.model';

export async function createMenu(req, res) {
  try {
    const menu = await Menu.createMenu(req.body);
    return res.status(HTTPStatus.CREATED).json(menu);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getMenus(req, res) {
  try {
    const menus = await Menu.list();
    return res.status(HTTPStatus.OK).json(menus);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getMenuById(req, res) {
  try {
    const menu = await Menu.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(menu);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function updateMenu(req, res) {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      menu[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await menu.save());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function deleteMenu(req, res) {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    await menu.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}
