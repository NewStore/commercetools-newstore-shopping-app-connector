import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import productRoute from './routes/product.route';
import categoryRoute from './routes/categorytree.route';
import projectRoute from './routes/project.route';  // Import the new route


// Import routes
import ServiceRoutes from './routes/service.route';

// Import logger
import { logger } from './utils/logger.utils';

import { readConfiguration } from './utils/config.utils';
import { errorMiddleware } from './middleware/error.middleware';

// Read env variables
readConfiguration();

const PORT = process.env.PORT || 8080;

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);
app.use(express.json());
app.use('/api', productRoute);
app.use('/api', projectRoute);  // Add the new route
app.use('/api', categoryRoute);


// Global error handler
app.use(errorMiddleware);

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
