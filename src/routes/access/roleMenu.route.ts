import userRoleController from '../../controllers/userRole.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/userRole.schema';

import { Router } from 'express';
const router = Router();

router.post('/user-roles/create', validate(schema), asyncHandler(userRoleController.create));
router.put('/user-roles/update', asyncHandler(userRoleController.update));
router.delete('/user-roles/delete', asyncHandler(userRoleController.delete));

export default router;
