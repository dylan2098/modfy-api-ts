import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import orderController from '../../controllers/order.controller';

const router = Router();

router.post('/create-order', asyncHandler(orderController.create));
router.post('/search-order', asyncHandler(orderController.search));
export default router;