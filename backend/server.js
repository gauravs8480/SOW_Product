import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import productsRoutes from './routes/Products.js';
import termsRoutes from './routes/terms.js'; // 👈 Add this line

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

await app.register(productsRoutes);
await app.register(termsRoutes); // 👈 Add this line

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Database connected and models synced');

  await app.listen({ port: process.env.PORT || 3001 });
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3001}`);
  
} catch (err) {
  console.error('❌ Server failed to start:', err);
}
