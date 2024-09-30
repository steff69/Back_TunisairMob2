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

// Connect to the database
dbConnection();

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());
app.options('*', cors());

// Enable file compression
app.use(compression());

// Serve static files (e.g., images) from the 'uploads/voles' folder
app.use('/voles', express.static(path.join(__dirname, 'uploads/voles')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Define routes
const User = require('./routes/authuser');
const Vole = require('./routes/vole');
const VoleMain = require('./routes/voleMain');

// Test route (optional)
app.get('/api/s', (req, res) => {
  console.log('Test route hit');
  res.send('Test route response');
});

// Mount API routes
app.use('/api/vole', Vole);
app.use('/api/volemain', VoleMain);
app.use('/api/user', User);

// Handle unknown routes (404)
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

// Handle unhandled promise rejections (e.g., MongoDB connection errors)
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting down server due to unhandled promise rejection...');
    process.exit(1);
  });
});
