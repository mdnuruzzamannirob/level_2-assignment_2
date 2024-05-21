import { z } from 'zod';

// Zod schema for Variants with custom error messages
const variantsValidationSchema = z.object({
  type: z.string({
    required_error: 'Type is required',
    invalid_type_error: 'Type must be a string',
  }),
  value: z.string({
    required_error: 'Value is required',
    invalid_type_error: 'Value must be a string',
  }),
});

// Zod schema for Inventory with custom error messages
const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .int({ message: 'Quantity must be an integer' })
    .min(0, { message: 'Quantity cannot be negative' }),
  inStock: z.boolean({
    required_error: 'InStock is required',
    invalid_type_error: 'InStock must be a boolean',
  }),
});

// Zod schema for Product with custom error messages
const productValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative({
      message: 'Price must be a value greater than or equal to zero',
    }),
  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string',
  }),
  tags: z.array(
    z.string({
      required_error: 'Tag is required',
      invalid_type_error: 'Tag must be a string',
    }),
  ),
  variants: z
    .array(variantsValidationSchema, {
      message: 'Variants field is required',
    })
    .nonempty({
      message: 'Variants cannot be empty',
    }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
