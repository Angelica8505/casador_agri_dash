const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'role_id'
  },
  roleName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'role_name'
  }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Role; 