import RoleController from '../../controllers/role.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/role.schema';

import { Router } from 'express';
const router = Router();

router.post('/roles/create', validate(schema), asyncHandler(RoleController.create));
router.put('/roles/update', asyncHandler(RoleController.update));
router.delete('/roles/delete', asyncHandler(RoleController.delete));
router.get('/roles/list', asyncHandler(RoleController.list));

export default router;
