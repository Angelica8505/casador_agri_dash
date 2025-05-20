# Agricultural Dashboard

A full-stack web application that visualizes agricultural data through an interactive dashboard. This project demonstrates the implementation of modern web development practices and technologies.

## Features

- Interactive data visualization using Chart.js
- Responsive design using TailwindCSS
- RESTful API built with Node.js and Express
- MySQL database integration
- Real-time data updates
- Modern UI/UX design

## Tech Stack

- **Frontend:**
  - React.js
  - TailwindCSS
  - Chart.js
  - Axios for API calls

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - Sequelize ORM

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd agricultural-dashboard
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up the database:
- Create a MySQL database named `agricultural_dashboard`
- Import the database schema from `backend/database/schema.sql`
- Configure database connection in `backend/.env`

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Documentation

API documentation is available at `/api-docs` when running the backend server.

## Project Structure

```
agricultural-dashboard/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── database/         # Database migrations and seeds
│
└── docs/                 # Project documentation
```

## License

MIT License 