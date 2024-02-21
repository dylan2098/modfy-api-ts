import MenuController from '../../controllers/menu.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/menu.schema';

import { Router } from 'express';
import { permissions } from '../../utils/auth.util';
import { ROLE } from '../../core/access/role.core';
const router = Router();

router.post('/create', permissions([ROLE.ADMIN]),  validate(schema), asyncHandler(MenuController.create));
router.put('/update', permissions([ROLE.ADMIN]), asyncHandler(MenuController.update));
router.delete('/delete', permissions([ROLE.ADMIN]), asyncHandler(MenuController.delete));
router.get('/list', asyncHandler(MenuController.list));

export default router;
