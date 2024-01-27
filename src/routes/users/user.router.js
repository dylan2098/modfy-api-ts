'use strict';

import userController from '../../controllers/user.controller.js';
import asyncHandler from '../../helpers/asyncHandler.js';

import { Router } from "express";
const router = Router();


router.post('/users/signup', asyncHandler(userController.signUp))

export default router;
