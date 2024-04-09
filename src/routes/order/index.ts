import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import orderController from '../../controllers/order.controller';

const router = Router();

router.post('/create-order', asyncHandler(orderController.create));
export default router;