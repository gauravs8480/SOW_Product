// backend/seed/seedProducts.js
import sequelize from '../config/db.js';
import Product from '../models/Product.js';

const sampleProducts = Array.from({ length: 20 }).map((_, i) => ({
  article_no: `ART-${i + 1}`,
  name: `Sample Product ${i + 1}`,
  in_price: 10 + i,
  price: 20 + i * 2,
  unit: 'pcs',
  stock: 100 + i,
  description: `Description for Sample Product ${i + 1}`,
}));

async function seedProducts() {
  try {
    await sequelize.sync({ alter: true });
    await Product.destroy({ where: {} });
    await Product.bulkCreate(sampleProducts);
    console.log('✅ Seeded 20 products successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed products:', err);
    process.exit(1);
  }
}

seedProducts();
