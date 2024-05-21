import { TProduct } from './product.interface';
import ProductModel from './product.model';

// create a new product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async (queryParams: any) => {
  let query = {};

  // If queryParams is not empty, construct the query
  if (Object.keys(queryParams).length !== 0) {
    const orConditions = [];
    if (queryParams.name) {
      orConditions.push({
        name: { $regex: new RegExp(queryParams.name, 'i') },
      });
    }
    if (queryParams.description) {
      orConditions.push({
        description: { $regex: new RegExp(queryParams.description, 'i') },
      });
    }
    if (queryParams.tags) {
      orConditions.push({
        tags: { $regex: new RegExp(queryParams.tags, 'i') },
      });
    }

    query = { $or: orConditions };
  }

  const result = await ProductModel.find(query);
  return result;
};

// get single product by params
const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

// update single product
const updateSingleProductFromDB = async (
  _id: string,
  updatedProductData: TProduct,
) => {
  const updatedData = await ProductModel.updateOne({ _id }, updatedProductData);
  if (updatedData.modifiedCount > 0) {
    const result = await ProductModel.findOne({ _id });
    return result;
  }
  return updatedData;
};

// delete single product
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id });
  console.log(result);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
