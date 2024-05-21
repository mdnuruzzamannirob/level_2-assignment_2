import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Dear! this is level-2 assignment-2');
});

// Middleware to handle 404 Not Found errors
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error-handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Handle other errors
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
});

export default app;
