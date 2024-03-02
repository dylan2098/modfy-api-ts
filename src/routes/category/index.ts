import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import CategoryController from '../../controllers/category.controller';
import validate from '../../middlewares/validate';
import {createSchema, updateSchema} from '../../schemas/category.schema';

const router = Router();

router.post('/create', validate(createSchema), asyncHandler(CategoryController.create));
router.put('/update', validate(updateSchema), asyncHandler(CategoryController.update));
router.delete('/delete', asyncHandler(CategoryController.delete));
router.get('/list', asyncHandler(CategoryController.list));

export default router;