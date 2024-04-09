import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import basketController from '../../controllers/basket.controller';

const router = Router();

router.post('/create-basket', asyncHandler(basketController.create));
router.put('/update-basket', asyncHandler(basketController.update));
router.delete('/delete-basket/:basketId', asyncHandler(basketController.delete));
router.get('/get-basket/:basketId', asyncHandler(basketController.get));

export default router;