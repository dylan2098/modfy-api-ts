import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import paymentTransactionController from '../../controllers/paymentTransaction.controller';

const router = Router();

router.post('/create-payment-transaction', asyncHandler(paymentTransactionController.create));
export default router;