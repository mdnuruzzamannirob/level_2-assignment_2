import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validator';
import { MongoError } from 'mongodb';

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // zod validation
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    // Custom error handling for duplicate key error
    if (error instanceof MongoError && error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Product with this name already exists!',
      });
    } else {
      // Other error handling
      res.status(500).json({
        success: false,
        message: 'Failed to create a Product!',
        error,
      });
    }
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;
    const result = await ProductServices.getAllProductsFromDB(queryParams);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetched Products!',
      error,
    });
  }
};

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (productId) {
    }
    const query = req.query;
    console.log(query);
    const result = await ProductServices.getSingleProductFromDB(productId);

    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Product!',
      error,
    });
  }
};

// get single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    // zod validation
    const zodParsedData = productValidationSchema.parse(updatedProductData);

    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      zodParsedData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Product!',
      error,
    });
  }
};

// get single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    if (result)
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete Product!',
        error: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Product!',
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
