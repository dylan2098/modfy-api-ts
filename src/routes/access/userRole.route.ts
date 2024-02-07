import UserRoleController from '../../controllers/userRole.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/userRole.schema';

import { Router } from 'express';
const router = Router();

router.post('/user-role/create', validate(schema), asyncHandler(UserRoleController.create));
router.put('/user-role/update', asyncHandler(UserRoleController.update));
router.delete('/user-role/delete', asyncHandler(UserRoleController.delete));

export default router;
