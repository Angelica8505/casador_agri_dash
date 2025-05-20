const express = require('express');
const router = express.Router();
const { SalesTransaction, Product, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Get sales trend data
router.get('/trends', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const whereClause = {};
    
    if (startDate && endDate) {
      whereClause.transactionDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const salesData = await SalesTransaction.findAll({
      where: whereClause,
      attributes: [
        [sequelize.fn('DATE', sequelize.col('transaction_date')), 'date'],
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('transaction_id')), 'transactionCount']
      ],
      group: [sequelize.fn('DATE', sequelize.col('transaction_date'))],
      order: [[sequelize.fn('DATE', sequelize.col('transaction_date')), 'ASC']]
    });

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top selling products
router.get('/top-products', async (req, res) => {
  try {
    const topProducts = await SalesTransaction.findAll({
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity_sold')), 'totalQuantity'],
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalRevenue']
      ],
      include: [{
        model: Product,
        attributes: ['productName', 'category']
      }],
      group: ['productId'],
      order: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'DESC']],
      limit: 10
    });

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sales by category
router.get('/category-sales', async (req, res) => {
  try {
    const categorySales = await SalesTransaction.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('transaction_id')), 'transactionCount']
      ],
      include: [{
        model: Product,
        attributes: ['category']
      }],
      group: ['Product.category']
    });

    res.json(categorySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 