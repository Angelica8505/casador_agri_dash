const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'product_id'
  },
  productName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'product_name'
  },
  category: {
    type: DataTypes.STRING(50)
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'unit_price'
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'quantity_in_stock'
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product; 