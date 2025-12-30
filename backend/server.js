require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./src/config/db');
const routes = require('./src/routes');
const { notFoundHandler, errorHandler } = require('./src/middleware/error.middleware');
const { seedWorkshops } = require('./src/seeds/workshops.seed');
const { seedPendingWorkshops } = require('./src/seeds/pending-workshops.seed');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    // Seed workshops data on startup
    await seedWorkshops();
    
    // Seed pending workshops for admin review
    await seedPendingWorkshops();

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;