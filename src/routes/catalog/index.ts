import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import CatalogController from '../../controllers/catalog.controller';
import validate from '../../middlewares/validate';
import schema from '../../schemas/catalog.schema';
import { permissions } from '../../utils/auth.util';
import { ROLE } from '../../core/role.core';

const router = Router();

router.post('/create', permissions([ROLE.ADMIN]), validate(schema), asyncHandler(CatalogController.create));
router.put('/update', permissions([ROLE.ADMIN]), validate(schema), asyncHandler(CatalogController.update));
router.delete('/delete', permissions([ROLE.ADMIN]), asyncHandler(CatalogController.delete));
router.get('/list', asyncHandler(CatalogController.list));

export default router;