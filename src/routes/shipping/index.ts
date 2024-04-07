import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import shippingController from '../../controllers/shipping.controller';

const router = Router();

router.post('/add-shipping', asyncHandler(shippingController.addShipping));

export default router;