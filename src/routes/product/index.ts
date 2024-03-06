import { Router } from 'express';

import { ROLE } from '../../core/access/role.core';
import { permissions } from '../../utils/auth.util';
import ProductController from '../../controllers/product.controller';
import { ProductSchema } from '../../schemas/product.schema';
import validate from '../../middlewares/validate';
import asyncHandler from '../../helpers/asyncHandler';

const router = Router();

router.post(
  '/create',
  validate(ProductSchema),
  permissions([ROLE.ADMIN]),
  asyncHandler(ProductController.create)
);

router.put('/update', permissions([ROLE.ADMIN]), asyncHandler(ProductController.update));
router.delete('/delete', permissions([ROLE.ADMIN]), asyncHandler(ProductController.delete));
router.get('/list', asyncHandler(ProductController.list));

export default router;
