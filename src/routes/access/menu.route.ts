import menuController from '../../controllers/menu.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/menu.schema';

import { Router } from 'express';
const router = Router();

router.post('/menus/create', validate(schema), asyncHandler(menuController.create));
router.put('/menus/update', asyncHandler(menuController.update));
router.delete('/menus/delete', asyncHandler(menuController.delete));
router.get('/menus/list', asyncHandler(menuController.list));

export default router;
