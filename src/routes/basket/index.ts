import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import basketController from '../../controllers/basket.controller';

const router = Router();

router.post('/add-basket', asyncHandler(basketController.addBasket));
router.put('/update-basket', asyncHandler(basketController.updateBasket));
router.delete('/delete-basket/:basketId', asyncHandler(basketController.deleteBasket));
router.get('/get-basket/:basketId', asyncHandler(basketController.getBasket));

export default router;