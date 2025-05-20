const express = require('express');
const router = express.Router();
const AgriculturalData = require('../models/AgriculturalData');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

// Get crop production trends over time
router.get('/crop-trends', async (req, res) => {
  try {
    const { startDate, endDate, cropType } = req.query;
    const whereClause = {};
    
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    if (cropType) {
      whereClause.cropType = cropType;
    }

    const data = await AgriculturalData.findAll({
      where: whereClause,
      order: [['date', 'ASC']],
      attributes: ['date', 'quantity', 'cropType']
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get crop distribution by type
router.get('/crop-distribution', async (req, res) => {
  try {
    const data = await AgriculturalData.findAll({
      attributes: [
        'cropType',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      group: ['cropType']
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get price trends
router.get('/price-trends', async (req, res) => {
  try {
    const { startDate, endDate, cropType } = req.query;
    const whereClause = {};
    
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    if (cropType) {
      whereClause.cropType = cropType;
    }

    const data = await AgriculturalData.findAll({
      where: whereClause,
      order: [['date', 'ASC']],
      attributes: ['date', 'price', 'cropType']
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get location-based production
router.get('/location-production', async (req, res) => {
  try {
    const data = await AgriculturalData.findAll({
      attributes: [
        'location',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      group: ['location']
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get weather impact analysis
router.get('/weather-impact', async (req, res) => {
  try {
    const data = await AgriculturalData.findAll({
      attributes: [
        'weatherCondition',
        [sequelize.fn('AVG', sequelize.col('quantity')), 'averageQuantity'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['weatherCondition']
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 