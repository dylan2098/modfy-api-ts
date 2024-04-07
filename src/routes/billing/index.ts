import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import billingController from '../../controllers/billing.controller';

const router = Router();

router.post('/add-billing', asyncHandler(billingController.addBilling));
export default router;