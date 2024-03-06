import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import InventoryController from '../../controllers/inventory.controller';
import validate from '../../middlewares/validate';
import schema from '../../schemas/inventory.schema';

const router = Router();

router.post('/create', validate(schema), asyncHandler(InventoryController.create));
router.put('/update', validate(schema), asyncHandler(InventoryController.update));
router.delete('/delete', asyncHandler(InventoryController.delete));
router.get('/list', asyncHandler(InventoryController.list));

export default router;