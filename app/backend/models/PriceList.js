// backend/models/PriceList.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PriceList = sequelize.define('PriceList', {
  articleNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default PriceList;
