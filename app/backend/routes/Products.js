import Product from '../models/Product.js';

export default async function (fastify, opts) {
  // Fetch all products
  fastify.get('/api/products', async (req, reply) => {
    try {
      const products = await Product.findAll({ order: [['id', 'ASC']] });
      reply.send(products);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
      reply.status(500).send({ error: 'Failed to fetch products' });
    }
  });

  // Add a new product
  fastify.post('/api/products', async (req, reply) => {
    try {
      const newProduct = await Product.create(req.body);
      reply.status(201).send(newProduct);
    } catch (err) {
      console.error('❌ Failed to add product:', err);
      reply.status(500).send({ error: 'Failed to add product' });
    }
  });

  // Update an existing product
  fastify.put('/api/products/:id', async (req, reply) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' });
      }

      await product.update(req.body);
      reply.send(product);
    } catch (err) {
      console.error('❌ Failed to update product:', err);
      reply.status(500).send({ error: 'Failed to update product' });
    }
  });

  // Delete a product
  fastify.delete('/api/products/:id', async (req, reply) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' });
      }

      await product.destroy();
      reply.send({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('❌ Failed to delete product:', err);
      reply.status(500).send({ error: 'Failed to delete product' });
    }
  });
}
