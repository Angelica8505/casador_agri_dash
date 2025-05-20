const express = require('express');
const router = express.Router();
const { DeliveryRecord, SalesTransaction, User, DeliveryRoute } = require('../models');
const { Op } = require('sequelize');

// Get delivery status
router.get('/status', async (req, res) => {
  try {
    const deliveries = await DeliveryRecord.findAll({
      include: [
        {
          model: SalesTransaction,
          include: [{
            model: User,
            as: 'recordedBy',
            attributes: ['username', 'fullName']
          }]
        },
        {
          model: User,
          as: 'deliveryPersonnel',
          attributes: ['username', 'fullName']
        }
      ],
      order: [['deliveryDate', 'DESC']]
    });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get delivery routes
router.get('/routes', async (req, res) => {
  try {
    const routes = await DeliveryRoute.findAll({
      include: [{
        model: DeliveryRecord,
        include: [{
          model: SalesTransaction,
          attributes: ['transactionDate']
        }]
      }],
      order: [['deliveryId', 'DESC']]
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get delivery statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await DeliveryRecord.findAll({
      attributes: [
        'deliveryStatus',
        [sequelize.fn('COUNT', sequelize.col('delivery_id')), 'count']
      ],
      group: ['deliveryStatus']
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 