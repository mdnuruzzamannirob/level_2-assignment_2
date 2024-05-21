import { TProduct } from './product.interface';
import ProductModel from './product.model';

// create a new product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

// update single product
const updateSingleProductFromDB = async (
  _id: string,
  updatedProductData: TProduct,
) => {
  const result = await ProductModel.updateOne({ _id }, updatedProductData);
  return result;
};

// delete single product
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
