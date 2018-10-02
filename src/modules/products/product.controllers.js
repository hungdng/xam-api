import HTTPStatus from 'http-status';
import Product from './product.model';

export async function createProduct(req, res) {
  try {
    const product = await Product.createProduct(req.body);
    return res.status(HTTPStatus.CREATED).json(product);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getProducts(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const posts = await Product.list({ limit, skip });
    return res.status(HTTPStatus.OK).json(posts);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    return res.status(HTTPStatus.OK).json(product);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getProductByCategoryId(req, res) {
  try {
    const param = {
      category: req.params.id,
    };
    const product = await Product.find(param);
    return res.status(HTTPStatus.OK).json(product);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await product.save());
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    await product.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}
