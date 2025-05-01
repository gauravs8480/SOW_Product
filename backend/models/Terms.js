// backend/models/Terms.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Terms = sequelize.define('Terms', {
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Terms;
