import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import paymentMethodController from '../../controllers/paymentMethod.controller';

const router = Router();

router.post('/create-payment-method', asyncHandler(paymentMethodController.create));
export default router;