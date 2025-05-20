const request = require('supertest');
const express = require('express');
const { Product, InventoryLog, User } = require('../../models');
const inventoryRoutes = require('../inventory.routes');

// Mock the models
jest.mock('../../models', () => ({
  Product: {
    findAll: jest.fn(),
  },
  InventoryLog: {
    findAll: jest.fn(),
  },
  User: {
    findAll: jest.fn(),
  },
}));

describe('Inventory Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/inventory', inventoryRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/inventory/levels', () => {
    test('should return inventory levels', async () => {
      const mockInventoryLevels = [
        {
          productId: 1,
          productName: 'Rice',
          category: 'Grains',
          quantityInStock: 100,
          unitPrice: 25.50
        },
        {
          productId: 2,
          productName: 'Corn',
          category: 'Grains',
          quantityInStock: 200,
          unitPrice: 20.75
        }
      ];

      Product.findAll.mockResolvedValue(mockInventoryLevels);

      const response = await request(app)
        .get('/api/inventory/levels')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockInventoryLevels);
      expect(Product.findAll).toHaveBeenCalled();
    });

    test('should handle errors', async () => {
      Product.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/inventory/levels')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/inventory/logs', () => {
    test('should return recent inventory logs', async () => {
      const mockInventoryLogs = [
        {
          Product: { productName: 'Rice' },
          User: { username: 'admin', fullName: 'Admin User' },
          actionType: 'add',
          quantity: 50,
          logDate: '2024-01-01'
        }
      ];

      InventoryLog.findAll.mockResolvedValue(mockInventoryLogs);

      const response = await request(app)
        .get('/api/inventory/logs')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockInventoryLogs);
      expect(InventoryLog.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /api/inventory/alerts', () => {
    test('should return low stock alerts', async () => {
      const mockLowStockProducts = [
        {
          productId: 1,
          productName: 'Rice',
          category: 'Grains',
          quantityInStock: 5,
          unitPrice: 25.50
        }
      ];

      Product.findAll.mockResolvedValue(mockLowStockProducts);

      const response = await request(app)
        .get('/api/inventory/alerts')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockLowStockProducts);
      expect(Product.findAll).toHaveBeenCalled();
    });
  });
}); 