/* eslint-disable no-console */
import HTTPStatus from 'http-status';
import Category from './category.model';

export async function createCategory(req, res) {
  try {
    const category = await Category.createCategory(req.body);
    return res.status(HTTPStatus.CREATED).json(category);
  } catch (error) {
    console.log(error);
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getCategories(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);

  try {
    const categories = await Category.getList({ limit, skip });
    return res.status(HTTPStatus.OK).json(categories);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getById(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(HTTPStatus.OK).json(category);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }
    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await category.save());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    await category.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}
