import RoleMenuController from '../../controllers/roleMenu.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/roleMenu.schema';

import { Router } from 'express';
const router = Router();

router.post('/role-menu/create', validate(schema), asyncHandler(RoleMenuController.create));
router.put('/role-menu/update', asyncHandler(RoleMenuController.update));
router.delete('/role-menu/delete', asyncHandler(RoleMenuController.delete));

export default router;
