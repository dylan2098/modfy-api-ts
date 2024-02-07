import UserController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/user.schema';

import { Router } from 'express';
const router = Router();

router.post('/users/signup', validate(schema), asyncHandler(UserController.signUp));
router.get('/users/active/:code', asyncHandler(UserController.authenticateEmail));
router.post('/users/login', asyncHandler(UserController.login));

export default router;
