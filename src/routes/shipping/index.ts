import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import shippingController from '../../controllers/shipping.controller';

const router = Router();

router.post('/create-shipping', asyncHandler(shippingController.create));

export default router;