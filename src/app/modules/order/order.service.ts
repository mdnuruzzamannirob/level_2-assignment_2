import { TOrder } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  // console.log(order);
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
