'use strict';

import userController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/user.schema';

import { Router } from 'express';
const router = Router();

router.post('/users/signup', validate(schema), asyncHandler(userController.signUp));

export default router;
