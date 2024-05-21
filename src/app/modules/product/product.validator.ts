import { z } from 'zod';

// Zod schema for Variants
const variantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod schema for Inventory
const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Zod schema for Product
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantsValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
