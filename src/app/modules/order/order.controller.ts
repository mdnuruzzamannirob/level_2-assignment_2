import { Request, Response } from 'express';
import orderValidationSchema from './order.validator';
import { OrderServices } from './order.service';
import { CustomError } from '../../errors/customError';

// create a new order
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
      res.status(500).json({
        success: false,
        message: 'Failed to create a order!',
        error,
      });
    }
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;
    const result = await OrderServices.getAllOrderFromDB(queryParams);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetched orders!',
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
