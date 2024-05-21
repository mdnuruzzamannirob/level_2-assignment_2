import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//  post request
router.post('/', ProductControllers.createProduct);

//  get all product request
router.get('/', ProductControllers.getAllProducts);

// get single product request
router.get('/:productId', ProductControllers.getSingleProduct);

// update single product request
router.put('/:productId', ProductControllers.updateSingleProduct);

// delete single product request
router.delete('/:productId', ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
