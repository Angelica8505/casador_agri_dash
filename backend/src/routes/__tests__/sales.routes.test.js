const request = require('supertest');
const express = require('express');
const { SalesTransaction, Product } = require('../../models');
const salesRoutes = require('../sales.routes');

// Mock the models
jest.mock('../../models', () => ({
  SalesTransaction: {
    findAll: jest.fn(),
  },
  Product: {
    findAll: jest.fn(),
  },
}));

describe('Sales Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/sales', salesRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/sales/trends', () => {
    test('should return sales trends data', async () => {
      const mockSalesData = [
        { date: '2024-01-01', totalSales: 1000 },
        { date: '2024-01-02', totalSales: 1500 }
      ];

      SalesTransaction.findAll.mockResolvedValue(mockSalesData);

      const response = await request(app)
        .get('/api/sales/trends')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockSalesData);
      expect(SalesTransaction.findAll).toHaveBeenCalled();
    });

    test('should handle errors', async () => {
      SalesTransaction.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/sales/trends')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/sales/top-products', () => {
    test('should return top products data', async () => {
      const mockTopProducts = [
        {
          Product: { productName: 'Rice' },
          totalRevenue: 5000
        },
        {
          Product: { productName: 'Corn' },
          totalRevenue: 3000
        }
      ];

      SalesTransaction.findAll.mockResolvedValue(mockTopProducts);

      const response = await request(app)
        .get('/api/sales/top-products')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockTopProducts);
      expect(SalesTransaction.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /api/sales/category-sales', () => {
    test('should return category sales data', async () => {
      const mockCategorySales = [
        {
          Product: { category: 'Grains' },
          totalSales: 8000
        },
        {
          Product: { category: 'Vegetables' },
          totalSales: 5000
        }
      ];

      SalesTransaction.findAll.mockResolvedValue(mockCategorySales);

      const response = await request(app)
        .get('/api/sales/category-sales')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCategorySales);
      expect(SalesTransaction.findAll).toHaveBeenCalled();
    });
  });
}); 