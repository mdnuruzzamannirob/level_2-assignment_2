import { CustomError } from '../../errors/customError';
import ProductModel from '../product/product.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const { productId } = order;

  const product = await ProductModel.findOne({ _id: productId });

  if (!product) {
    throw new CustomError(400, 'Product not found');
  } else if (
    product?.inventory.quantity !== undefined &&
    order.quantity > product?.inventory.quantity
  ) {
    throw new CustomError(400, 'Insufficient quantity available in inventory');
  } else {
    let inStock = true;
    if (product?.inventory.quantity - order.quantity === 0) {
      inStock = false;
    }
    const updateProductData = {
      $set: {
        'inventory.quantity': product?.inventory.quantity - order.quantity,
        'inventory.inStock': inStock,
      },
    };
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      updateProductData,
    );
    if (!updatedProduct) {
      throw new CustomError(400, 'Something went wrong. Please try again');
    } else {
      const result = await OrderModel.create(order);
      return result;
    }
  }
};

export const OrderServices = {
  createOrderIntoDB,
};
