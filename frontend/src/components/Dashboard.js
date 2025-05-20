import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { colors } from '../theme/colors';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Dashboard = () => {
  const [salesTrends, setSalesTrends] = useState([]);
  const [inventoryLevels, setInventoryLevels] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [inventoryLogs, setInventoryLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales trend data
        const salesResponse = await axios.get('/api/sales/trends');
        setSalesTrends(salesResponse.data);

        // Fetch inventory levels
        const inventoryResponse = await axios.get('/api/inventory/levels');
        setInventoryLevels(inventoryResponse.data);

        // Fetch delivery status
        const deliveryResponse = await axios.get('/api/deliveries/status');
        setDeliveryStatus(deliveryResponse.data);

        // Fetch top selling products
        const topProductsResponse = await axios.get('/api/sales/top-products');
        setTopProducts(topProductsResponse.data);

        // Fetch sales by category
        const categoryResponse = await axios.get('/api/sales/by-category');
        setCategorySales(categoryResponse.data);

        // Fetch recent inventory activities
        const activitiesResponse = await axios.get('/api/inventory/logs');
        setInventoryLogs(activitiesResponse.data);

        // Fetch delivery routes
        const routesResponse = await axios.get('/api/deliveries/routes');
        // setDeliveryRoutes(routesResponse.data);

        // Fetch dashboard stats
        const statsResponse = await axios.get('/api/dashboard/stats');
        // setDashboardStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.text.primary,
          font: {
            family: "'Poppins', sans-serif",
          }
        }
      },
      title: {
        display: true,
        color: colors.text.primary,
        font: {
          family: "'Poppins', sans-serif",
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  const salesTrendsData = {
    labels: salesTrends.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [{
      label: 'Daily Sales',
      data: salesTrends.map(item => item.totalSales),
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.light,
      tension: 0.4,
      fill: true
    }]
  };

  const inventoryLevelsData = {
    labels: inventoryLevels.map(item => item.productName),
    datasets: [{
      label: 'Stock Levels',
      data: inventoryLevels.map(item => item.quantityInStock),
      backgroundColor: colors.soil,
      borderColor: colors.soil,
      borderWidth: 1
    }]
  };

  const deliveryStatusData = {
    labels: ['Pending', 'In Transit', 'Delivered'],
    datasets: [{
      data: [
        deliveryStatus.filter(d => d.deliveryStatus === 'Pending').length,
        deliveryStatus.filter(d => d.deliveryStatus === 'In Transit').length,
        deliveryStatus.filter(d => d.deliveryStatus === 'Delivered').length
      ],
      backgroundColor: [
        colors.warning,
        colors.info,
        colors.success
      ],
      borderColor: colors.background.paper,
      borderWidth: 2
    }]
  };

  const topProductsData = {
    labels: topProducts.map(item => item.Product.productName),
    datasets: [{
      label: 'Revenue',
      data: topProducts.map(item => item.totalRevenue),
      backgroundColor: colors.wheat,
      borderColor: colors.secondary.dark,
      borderWidth: 1
    }]
  };

  const categorySalesData = {
    labels: categorySales.map(item => item.Product.category),
    datasets: [{
      label: 'Sales by Category',
      data: categorySales.map(item => item.totalSales),
      backgroundColor: [
        colors.primary.main,
        colors.secondary.main,
        colors.soil,
        colors.leaf,
        colors.wheat
      ],
      borderColor: colors.background.paper,
      borderWidth: 2
    }]
  };

  return (
    <div className="p-6 bg-background-default min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-main">Agricultural Dashboard</h1>
        <p className="text-text-secondary">Monitor your farm's performance and operations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Sales Trends</h2>
          <Line data={salesTrendsData} options={chartOptions} />
        </div>

        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Inventory Levels</h2>
          <Bar data={inventoryLevelsData} options={chartOptions} />
        </div>

        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Delivery Status</h2>
          <Doughnut data={deliveryStatusData} options={chartOptions} />
        </div>

        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Top Products</h2>
          <Bar data={topProductsData} options={chartOptions} />
        </div>

        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Sales by Category</h2>
          <Pie data={categorySalesData} options={chartOptions} />
        </div>

        <div className="bg-background-paper p-6 rounded-lg shadow-md border border-background-dark">
          <h2 className="text-xl font-semibold mb-4 text-primary-dark">Recent Inventory Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-background-dark">
                  <th className="px-4 py-2 text-left text-text-primary">Product</th>
                  <th className="px-4 py-2 text-left text-text-primary">Action</th>
                  <th className="px-4 py-2 text-left text-text-primary">Quantity</th>
                  <th className="px-4 py-2 text-left text-text-primary">Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryLogs.slice(0, 5).map((log, index) => (
                  <tr key={index} className="border-b border-background-dark hover:bg-background-dark">
                    <td className="px-4 py-2 text-text-secondary">{log.Product.productName}</td>
                    <td className="px-4 py-2 text-text-secondary">{log.actionType}</td>
                    <td className="px-4 py-2 text-text-secondary">{log.quantity}</td>
                    <td className="px-4 py-2 text-text-secondary">{new Date(log.logDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 