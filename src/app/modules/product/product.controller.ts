import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validator';
import { MongoError } from 'mongodb';

// Helper function for sending responses
const sendResponse = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data?: any,
  error?: any,
) => {
  const response: any = { success, message };
  if (data !== undefined) {
    response.data = data;
  }
  if (error !== undefined) {
    response.error = error;
  }
  res.status(status).json(response);
};

// Helper function for handling errors
const handleError = (res: Response, error: any, defaultMessage: string) => {
  if (error instanceof MongoError && error.code === 11000) {
    sendResponse(res, 400, false, 'Product with this name already exists!');
  } else if (error instanceof Error && error.name === 'CastError') {
    sendResponse(res, 400, false, 'Product not found!');
  } else {
    console.error('Error:', error);
    sendResponse(res, 500, false, defaultMessage, undefined, error);
  }
};

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // Zod validation
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);
    sendResponse(res, 200, true, 'Product created successfully!', result);
  } catch (error) {
    handleError(res, error, 'Failed to create a product!');
  }
};

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;
    const result = await ProductServices.getAllProductsFromDB(queryParams);
    sendResponse(res, 200, true, 'Products fetched successfully!', result);
  } catch (error) {
    handleError(res, error, 'Failed to fetch products!');
  }
};

// Get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    if (result) {
      sendResponse(res, 200, true, 'Product fetched successfully!', result);
    } else {
      sendResponse(res, 400, false, 'Product not found!');
    }
  } catch (error) {
    handleError(res, error, 'Failed to fetch product!');
  }
};

// Update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    // Zod validation
    const zodParsedData = productValidationSchema.parse(updatedProductData);

    // Update product in the database
    const updatedResult = await ProductServices.updateSingleProductFromDB(
      productId,
      zodParsedData,
    );

    if (updatedResult.modifiedCount > 0) {
      // Retrieve updated product
      const result = await ProductServices.getSingleProductFromDB(productId);
      sendResponse(res, 200, true, 'Product updated successfully!', result);
    } else if (updatedResult.matchedCount > 0) {
      sendResponse(
        res,
        200,
        false,
        'Product matched but not updated!',
        updatedResult,
      );
    } else {
      sendResponse(res, 400, false, 'Product not found!');
    }
  } catch (error) {
    handleError(res, error, 'Failed to update product!');
  }
};

// Delete single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    if (result) {
      sendResponse(res, 200, true, 'Product deleted successfully!', null);
    } else {
      sendResponse(res, 400, false, 'Product not found!');
    }
  } catch (error) {
    handleError(res, error, 'Failed to delete product!');
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
