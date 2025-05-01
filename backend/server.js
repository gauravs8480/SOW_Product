import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import productsRoutes from './routes/Products.js';

const app = Fastify({ logger: true });

// ✅ CORS Setup (allow PUT, DELETE, etc.)
await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// ✅ Register Routes
await app.register(productsRoutes);

// ✅ Connect DB and Start Server
try {
  await sequelize.authenticate();
  await sequelize.sync(); // use { alter: true } if needed
  console.log('✅ Database connected and models synced');

  await app.listen({ port: process.env.PORT || 3001 });
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3001}`);
} catch (err) {
  console.error('❌ Server failed to start:', err);
}
