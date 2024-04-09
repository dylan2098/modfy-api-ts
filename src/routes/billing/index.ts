import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import billingController from '../../controllers/billing.controller';

const router = Router();

router.post('/create-billing', asyncHandler(billingController.create));
export default router;