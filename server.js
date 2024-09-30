const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');

// Load environment variables
dotenv.config({ path: 'config.env' });

// Import routes
const User = require('./routes/authuser');
const Vole = require('./routes/vole');
const VoleMain = require('./routes/voleMain');

// Connect to database
dbConnection();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(compression()); // Compress responses

// Serve static files
app.use(express.static(path.join(__dirname, 'uploads')));

// Logger for development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Define routes
app.get('/api/s', (req, res) => {
  console.log('Request received');
  res.send("Response from server");
});

// Define routes - use app.get, not router.get
app.get("/allUser", (req, res) => {
  return res.status(404).json({ message: 'Its ok' });
});

// Mount routes
app.use('/api/Vole', Vole);
app.use('/api/VoleMain', VoleMain);
app.use('/api/user', User);

// Global error handling for undefined routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down server...');
    process.exit(1);
  });
});
