// backend/models/Terms.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Terms = sequelize.define('terms', {
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,  // ❌ Disable createdAt and updatedAt
});

export default Terms;
