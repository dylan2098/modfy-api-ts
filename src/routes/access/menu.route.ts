import MenuController from '../../controllers/menu.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/menu.schema';

import { Router } from 'express';
const router = Router();

router.post('/menus/create', validate(schema), asyncHandler(MenuController.create));
router.put('/menus/update', asyncHandler(MenuController.update));
router.delete('/menus/delete', asyncHandler(MenuController.delete));
router.get('/menus/list', asyncHandler(MenuController.list));

export default router;
