import { Request, Response } from 'express';
import orderValidationSchema from './order.validator';
import { OrderServices } from './order.service';
import { CustomError } from '../../errors/customError';

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle validation errors
const handleValidationError = (res: Response, message: string) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

// Handle service errors
const handleServiceError = (res: Response, error: any) => {
  if (error instanceof CustomError) {
    res.status(error.status).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof Error && error.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Product not found!',
    });
  } else {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create a order!',
      error,
    });
  }
};

// Create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // zod validation
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

// Define the expected structure of query parameters
interface OrderQueryParams {
  email?: string;
}

// Get all orders
const getAllOrder = async (
  req: Request<{}, {}, {}, OrderQueryParams>,
  res: Response,
) => {
  try {
    const queryParams = req.query;

    // Validate email if provided
    if (queryParams.email && !isValidEmail(queryParams.email)) {
      return handleValidationError(res, 'Invalid email format!');
    }

    const result = await OrderServices.getAllOrderFromDB(queryParams);

    if (queryParams.email) {
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'No orders found for user email!',
        });
      }
    }

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Orders not found!',
      });
    }
  } catch (error) {
    handleServiceError(res, error);
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
