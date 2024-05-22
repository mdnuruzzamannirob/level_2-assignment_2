import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({ message: 'Invalid email address' }),
  productId: z.string({
    required_error: 'productID is required',
    invalid_type_error: 'productID must be a string',
  }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative({
      message: 'Price must be a value greater than or equal to zero',
    }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity cannot be negative' }),
});

export default orderValidationSchema;
