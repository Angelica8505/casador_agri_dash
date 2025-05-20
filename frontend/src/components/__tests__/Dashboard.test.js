import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Dashboard from '../Dashboard';

// Mock axios
jest.mock('axios');

describe('Dashboard Component', () => {
  const mockData = {
    salesTrends: [
      { date: '2024-01-01', totalSales: 1000 },
      { date: '2024-01-02', totalSales: 1500 }
    ],
    inventoryLevels: [
      { productName: 'Rice', quantityInStock: 100 },
      { productName: 'Corn', quantityInStock: 200 }
    ],
    deliveryStatus: [
      { deliveryStatus: 'Pending' },
      { deliveryStatus: 'In Transit' },
      { deliveryStatus: 'Delivered' }
    ],
    topProducts: [
      { Product: { productName: 'Rice' }, totalRevenue: 5000 },
      { Product: { productName: 'Corn' }, totalRevenue: 3000 }
    ],
    categorySales: [
      { Product: { category: 'Grains' }, totalSales: 8000 },
      { Product: { category: 'Vegetables' }, totalSales: 5000 }
    ],
    inventoryLogs: [
      {
        Product: { productName: 'Rice' },
        actionType: 'add',
        quantity: 50,
        logDate: '2024-01-01'
      }
    ]
  };

  beforeEach(() => {
    // Mock all API calls
    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/api/sales/trends':
          return Promise.resolve({ data: mockData.salesTrends });
        case '/api/inventory/levels':
          return Promise.resolve({ data: mockData.inventoryLevels });
        case '/api/deliveries/status':
          return Promise.resolve({ data: mockData.deliveryStatus });
        case '/api/sales/top-products':
          return Promise.resolve({ data: mockData.topProducts });
        case '/api/sales/category-sales':
          return Promise.resolve({ data: mockData.categorySales });
        case '/api/inventory/logs':
          return Promise.resolve({ data: mockData.inventoryLogs });
        default:
          return Promise.reject(new Error('Not found'));
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Agricultural Dashboard')).toBeInTheDocument();
  });

  test('renders all chart sections', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Sales Trends')).toBeInTheDocument();
      expect(screen.getByText('Inventory Levels')).toBeInTheDocument();
      expect(screen.getByText('Delivery Status')).toBeInTheDocument();
      expect(screen.getByText('Top Products')).toBeInTheDocument();
      expect(screen.getByText('Sales by Category')).toBeInTheDocument();
      expect(screen.getByText('Recent Inventory Activity')).toBeInTheDocument();
    });
  });

  test('displays inventory activity data', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Rice')).toBeInTheDocument();
      expect(screen.getByText('add')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock API error
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });
}); 