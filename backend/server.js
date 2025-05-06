import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import productsRoutes from './routes/Products.js'; // optional
import termsRoutes from './routes/terms.js';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await app.register(productsRoutes);
await app.register(termsRoutes);

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Database connected and models synced');

  await app.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3001}`);
} catch (err) {
  console.error('❌ Server failed to start:', err);
}
