import roleController from '../../controllers/role.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/role.schema';

import { Router } from 'express';
const router = Router();

router.post('/roles/create', validate(schema), asyncHandler(roleController.create));
router.put('/roles/update', asyncHandler(roleController.update));
router.delete('/roles/delete', asyncHandler(roleController.delete));
router.get('/roles/list', asyncHandler(roleController.list));

export default router;
