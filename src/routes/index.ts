import { Router, Request, Response } from "express";
import { SuccessResponse } from '../utils/success.response'
import userRoute from './users/user.router';

const router = Router();


router.use('/v1/api', userRoute);

router.get('/', (req: Request, res: Response) => {
    new SuccessResponse({
        message: 'Welcome to Modfy API'
    }).send(res);
})

export default router;