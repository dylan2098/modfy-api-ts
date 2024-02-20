import UserController from '../../controllers/user.controller';
import asyncHandler from '../../helpers/asyncHandler';
import validate from '../../middlewares/validate';
import schema from '../../schemas/user.schema';

import { NextFunction, Request, Response, Router } from 'express';
import { authentication } from '../../utils/auth.util';
const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    const excludePath = ['/login', '/signup', '/active', '/delete-token-expired'];
    if (excludePath.includes(req.path)) {
        return next();
    }

    return authentication(req, res, next);
})

router.post('/refresh-token', asyncHandler(UserController.refreshToken));
router.post('/signup', validate(schema), asyncHandler(UserController.signUp));
router.get('/active/:user_id', asyncHandler(UserController.authenticateEmail));
router.post('/login', asyncHandler(UserController.login));
router.delete('/delete-token-expired', asyncHandler(UserController.deleteTokenExpired));

export default router;
