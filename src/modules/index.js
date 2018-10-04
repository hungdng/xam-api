import categoryRoutes from './categories/category.routes';
import productRoutes from './products/product.routes';
import imageRoutes from './Images/image.routes';

export default app => {
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/images', imageRoutes);
};
