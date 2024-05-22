import { CustomError } from '../../errors/customError';
import ProductModel from '../product/product.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { productId: _id, quantity } = order;

  // Check if the product exists
  const product = await ProductModel.findOne({ _id });
  if (!product) {
    throw new CustomError(400, 'Product not found');
  }

  // Check if there's sufficient quantity available in the inventory
  if (product?.inventory.quantity < quantity) {
    throw new CustomError(400, 'Insufficient quantity available in inventory');
  }

  // Update product inventory
  const newQuantity = product.inventory.quantity - quantity;
  let inStock = newQuantity > 0;
  const updateProductData = {
    $set: {
      'inventory.quantity': newQuantity,
      'inventory.inStock': inStock,
    },
  };

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    { _id },
    updateProductData,
  );

  if (!updatedProduct) {
    throw new CustomError(400, 'Something went wrong. Please try again');
  }

  // Create order
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromDB = async (queryParams: any) => {
  let query: any = {};

  if (queryParams.email) {
    query = {
      email: queryParams.email,
    };
  }
  const result = await OrderModel.find(query);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
