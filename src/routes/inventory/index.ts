import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import InventoryController from '../../controllers/inventory.controller';
import validate from '../../middlewares/validate';
import {schemaCreate, schemaUpdate} from '../../schemas/inventory.schema';

const router = Router();

router.post('/create', validate(schemaCreate), asyncHandler(InventoryController.create));
router.put('/update', validate(schemaUpdate), asyncHandler(InventoryController.update));
router.delete('/delete', asyncHandler(InventoryController.delete));
router.get('/list', asyncHandler(InventoryController.list));

export default router;