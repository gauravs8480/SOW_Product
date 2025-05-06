// backend/server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js'; // ✅ Sequelize DB config
import productsRoutes from './routes/Products.js'; // Optional route
import termsRoutes from './routes/terms.js';       // ✅ Terms API route

const app = Fastify({ logger: true });

// ✅ Enable CORS for frontend access
await app.register(cors, {
  origin: true, // allows any frontend origin, or use 'http://localhost:5173' for strict local dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// ✅ Register your routes
await app.register(productsRoutes);  // Optional
await app.register(termsRoutes);     // Required

// ✅ Start the server with host = '0.0.0.0' for Railway
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Database connected and models synced');

  await app.listen({
    port: process.env.PORT || 3001,
    host: '0.0.0.0' // 👈 Required for Railway / public cloud
  });

  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3001}`);
} catch (err) {
  console.error('❌ Server failed to start:', err);
}
