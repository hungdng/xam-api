import categoryRoutes from './categories/category.routes';
import productRoutes from './products/product.routes';

export default app => {
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/products', productRoutes);
};
