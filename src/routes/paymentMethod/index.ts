import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import paymentMethodController from '../../controllers/paymentMethod.controller';

const router = Router();

router.post('/add-payment-method', asyncHandler(paymentMethodController.addPaymentMethod));
export default router;