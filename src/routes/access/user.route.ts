import UserController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/user.schema';

import { Router } from 'express';
import { authentication } from '../../utils/auth.util';
const router = Router();

router.post('/signup', validate(schema), asyncHandler(UserController.signUp));
router.get('/active/:user_id', asyncHandler(UserController.authenticateEmail));
router.post('/login', asyncHandler(UserController.login));

router.use(authentication);
router.post('/refresh-token', asyncHandler(UserController.refreshToken));

export default router;
