# Casador Agricultural Market Dashboard

## Project Objectives
This academic project aims to strengthen full-stack development skills through:
- Creating a web-based dashboard for agricultural market data visualization
- Implementing Chart.js for dynamic front-end visualizations
- Building a Node.js backend with MySQL database integration
- Developing a RESTful API for data communication
- Applying modern UI/UX design principles using Bootstrap

## Project Description
An interactive dashboard application that visualizes agricultural market data through four distinct chart types:
1. *Line Chart*: Sales trends over time
2. *Bar Chart*: Product inventory levels
3. *Pie Chart*: Delivery status distribution
4. *Radar Chart*: Growth metrics and forecasting

### Core Features
- 📊 Real-time data visualization with Chart.js
- 📦 Dynamic inventory management system
- 🚚 Delivery tracking and route optimization
- 📈 Sales analytics and reporting
- 📋 Market growth forecasting
- 👥 Role-based user management

## Technical Implementation

### Frontend Technologies
- *HTML5/CSS3*
  - Semantic markup
  - Responsive design
  - Flexbox/Grid layouts
  
- *Bootstrap 5.3*
  - Mobile-first approach
  - Component styling
  - Utility classes

- *JavaScript/Chart.js*
  - Dynamic data fetching
  - Interactive visualizations
  - Real-time updates

### Backend Architecture
- *Node.js/Express*
  - RESTful API endpoints
  - Modular routing
  - Error handling middleware

- *MySQL Database*
  - Relational data model
  - Foreign key relationships
  - Optimized queries

## Project Setup

### Prerequisites
1. *Development Tools*
   - Visual Studio Code or preferred IDE
   - Git for version control
   - Postman for API testing

2. *Runtime Environment*
   - Node.js (v14 or higher)
   - npm (Node Package Manager)

3. *Database*
   - XAMPP (v8.0 or higher)
   - MySQL Workbench (optional)

### Step-by-Step Setup

1. *Install Dependencies*
   # Core dependencies
   npm install express mysql2 dotenv cors helmet compression express-validator jsonwebtoken bcrypt winston chart.js bootstrap @fortawesome/fontawesome-free
   
   # Development dependencies
   npm install --save-dev nodemon jest supertest eslint prettier

2. *Database Setup*
   CREATE DATABASE casador_agri_market;
   USE casador_agri_market;

   -- Create tables
   CREATE TABLE roles (
       role_id INT PRIMARY KEY AUTO_INCREMENT,
       role_name VARCHAR(50) NOT NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE users (
       user_id INT PRIMARY KEY AUTO_INCREMENT,
       role_id INT,
       username VARCHAR(50) NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       full_name VARCHAR(100),
       email VARCHAR(100),
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (role_id) REFERENCES roles(role_id)
   );

   CREATE TABLE products (
       product_id INT PRIMARY KEY AUTO_INCREMENT,
       product_name VARCHAR(255) NOT NULL,
       description TEXT,
       quantity_in_stock INT,
       unit_price DECIMAL(10,2),
       category VARCHAR(100),
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE sales_transactions (
       transaction_id INT PRIMARY KEY AUTO_INCREMENT,
       user_id INT,
       transaction_date DATETIME,
       total_amount DECIMAL(10,2),
       payment_status VARCHAR(50),
       FOREIGN KEY (user_id) REFERENCES users(user_id)
   );

   CREATE TABLE delivery_records (
       delivery_id INT PRIMARY KEY AUTO_INCREMENT,
       transaction_id INT,
       delivery_date DATETIME,
       delivery_status ENUM('Pending', 'In Transit', 'Delivered'),
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (transaction_id) REFERENCES sales_transactions(transaction_id)
   );

   CREATE TABLE forecast_reports (
       report_id INT PRIMARY KEY AUTO_INCREMENT,
       report_date DATE,
       report_data JSON,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

3.*Start Application*
   # Development mode
   npm run dev

   # Production mode
   npm start

## API Endpoints

### 1. Dashboard Summary
- **GET** `/api/dashboard`
- Returns summary statistics including total sales, products, deliveries, and growth rate
- Response:
{
  "summary": {
    "totalSales": 1257.25,
    "totalProducts": 4050,
    "totalDeliveries": 2,
    "growthRate": 15
  }
}

### 2. Sales Trends
- **GET** `/api/sales/trends`
- Returns sales data for the last 7 days
- Response:
{
  "labels": ["MM/DD/YYYY", ...],
  "data": [amount1, amount2, ...]
}


### 3. Inventory Status
- **GET** `/api/inventory/status`
- Returns current inventory levels for all products
- Response:
{
  "products": [
    {
      "name": "Product Name",
      "quantity": 100
    }
  ]
}

### 4. Delivery Status
- **GET** `/api/deliveries/status`
- Returns count of deliveries by status
- Response:
{
  "pending": 5,
  "inTransit": 3,
  "delivered": 10
}

### 5. Growth Metrics
- **GET** `/api/growth/metrics`
- Returns growth metrics across different categories
- Response:
{
  "labels": ["Sales Growth", "Market Share", "Customer Base", "Product Range", "Supply Chain"],
  "data": [80, 60, 70, 50, 65]
}

### 6. Recent Sales
- **GET** `/api/sales/recent`
- Returns the 10 most recent sales transactions
- Response:
[
  {
    "transaction_id": 1,
    "product_name": "Product Name",
    "quantity_sold": 5,
    "total_amount": 100.00,
    "transaction_date": "2024-01-01T00:00:00Z"
  }
]

### 7. Product List
- **GET** `/api/products`
- Returns list of all products
- Response:
```json
[
  {
    "product_id": 1,
    "product_name": "Product Name",
    "category": "Category",
    "unit_price": 20.00,
    "quantity_in_stock": 100
  }
]
```

## Project Structure
```
casador_agri_dashboard/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side scripts
│   └── assets/            # Images and fonts
├── views/                 # EJS templates
├── routes/                # API routes
├── controllers/           # Business logic
├── models/               # Database models
├── middleware/           # Custom middleware
├── utils/               # Helper functions
├── config/              # Configuration files
├── docs/                # Documentation
└── tests/              # Test files

## Access Points
- Development: http://localhost:3000

## Contributors
Group Members:
- Angelica Nicole D. Aguilar
- May Trixie Manumbali
- Princess Jhaymie Manalo
- Raven Landicho

Course: BSIT-BA-3203
Batangas State University
College of Informatics and Computing Sciences

## License
This project is created for academic purposes at Batangas State University.
All rights reserved © 2024 

## Testing on a Mobile Device

To view and test the dashboard on your phone:

1. **Connect Both Devices to the Same WiFi**
   - Make sure your desktop/laptop (where the app is running) and your phone are connected to the same WiFi network.

2. **Find Your Computer's Local IP Address**
   - On Windows, open Command Prompt and type: `ipconfig`
   - Look for the `IPv4 Address` (e.g., `192.168.110`)

3. **Start the Application**
   - Run the app on your computer: `npm run dev` or `npm start`
   - By default, the app runs on port 3000

4. **Access from Your Phone**
   - Open a browser on your phone
   - Enter the URL: `http://<your-computer-ip>:3000` (e.g., `http://192.168.110:3000`)
   - You should now see the dashboard as it appears on desktop, but in a mobile-friendly layout

**Note:**
- If the site does not load, check your firewall settings and ensure port 3000 is open.
- The app must be running on your computer for your phone to access it. 