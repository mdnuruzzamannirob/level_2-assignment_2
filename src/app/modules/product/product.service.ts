import { TProduct } from './product.interface';
import ProductModel from './product.model';

// create a new product
const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProductsFromDB = async (queryParams: any) => {
  let query: object = {};

  if (queryParams.searchTerm) {
    const searchRegex = new RegExp(queryParams.searchTerm, 'i'); // Case-insensitive regex for partial matches
    query = {
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }, // Matching any of the tags
      ],
    };
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
  return updatedData;
};

// delete single product
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
