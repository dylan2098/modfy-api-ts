import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import CatalogController from '../../controllers/catalog.controller';
import validate from '../../middlewares/validate';
import schema from '../../schemas/catalog.schema';

const router = Router();

router.post('/create', validate(schema), asyncHandler(CatalogController.create));
router.put('/update', validate(schema), asyncHandler(CatalogController.update));
router.delete('/delete', asyncHandler(CatalogController.delete));
router.get('/list', asyncHandler(CatalogController.list));

export default router;