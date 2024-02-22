import UserController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import {createUserSchema, updateUserSchema} from '../../schemas/user.schema';

import { Router } from 'express';
import { permissions } from '../../utils/auth.util';
import { ROLE } from '../../core/access/role.core';

const router = Router();

router.put('/update-profile', validate(updateUserSchema), permissions([ROLE.ADMIN, ROLE.CUSTOMER]), asyncHandler(UserController.updateProfile));

router.post('/refresh-token', permissions([ROLE.ADMIN, ROLE.CUSTOMER]), asyncHandler(UserController.refreshToken));

router.post('/signup', validate(createUserSchema), asyncHandler(UserController.signUp));

router.get('/active/:user_id', asyncHandler(UserController.authenticateEmail));

router.post('/login', asyncHandler(UserController.login));

router.delete('/delete-token-expired', permissions([ROLE.ADMIN]), asyncHandler(UserController.deleteTokenExpired));

export default router;
