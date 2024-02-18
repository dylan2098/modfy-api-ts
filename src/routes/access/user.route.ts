import UserController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/user.schema';

import { Router } from 'express';
import { authentication } from '../../utils/auth.util';
const router = Router();

router.post('/users/signup', validate(schema), asyncHandler(UserController.signUp));
router.get('/users/active/:user_id', asyncHandler(UserController.authenticateEmail));
router.post('/users/login', asyncHandler(UserController.login));

router.use(authentication);
router.post('/users/refresh-token', asyncHandler(UserController.refreshToken));

export default router;
