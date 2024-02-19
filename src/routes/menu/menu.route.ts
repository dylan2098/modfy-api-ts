import MenuController from '../../controllers/menu.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/menu.schema';

import { Router } from 'express';
const router = Router();

router.post('/create', validate(schema), asyncHandler(MenuController.create));
router.put('/update', asyncHandler(MenuController.update));
router.delete('/delete', asyncHandler(MenuController.delete));
router.get('/list', asyncHandler(MenuController.list));

export default router;
