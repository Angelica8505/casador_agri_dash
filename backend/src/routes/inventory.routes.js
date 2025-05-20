const express = require('express');
const router = express.Router();
const { Product, InventoryLog, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Get inventory levels
router.get('/levels', async (req, res) => {
  try {
    const inventoryLevels = await Product.findAll({
      attributes: [
        'productId',
        'productName',
        'category',
        'quantityInStock',
        'unitPrice'
      ],
      order: [['category', 'ASC']]
    });

    res.json(inventoryLevels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent inventory activities
router.get('/logs', async (req, res) => {
  try {
    const recentLogs = await InventoryLog.findAll({
      include: [
        {
          model: Product,
          attributes: ['productName']
        },
        {
          model: User,
          attributes: ['username', 'fullName']
        }
      ],
      order: [['logDate', 'DESC']],
      limit: 50
    });

    res.json(recentLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get low stock alerts
router.get('/alerts', async (req, res) => {
  try {
    const lowStockProducts = await Product.findAll({
      where: {
        quantityInStock: {
          [Op.lt]: 10 // Alert threshold
        }
      },
      attributes: [
        'productId',
        'productName',
        'category',
        'quantityInStock',
        'unitPrice'
      ]
    });

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 