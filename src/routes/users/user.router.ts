'use strict';

import userController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';

import { Router } from 'express';
const router = Router();

router.post('/users/signup', asyncHandler(userController.signUp));

export default router;
