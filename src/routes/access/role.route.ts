import RoleController from '../../controllers/role.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/role.schema';

import { Router } from 'express';
const router = Router();

router.post('/create', validate(schema), asyncHandler(RoleController.create));
router.put('/update', asyncHandler(RoleController.update));
router.delete('/delete', asyncHandler(RoleController.delete));
router.get('/list', asyncHandler(RoleController.list));

export default router;
