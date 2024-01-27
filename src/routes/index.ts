import { Router, Request, Response } from "express";
import { SuccessResponse } from '../utils/success.response'

const router = Router();

router.get('/',  (req: Request, res: Response) => {
    new SuccessResponse({
        message: 'Welcome to Modfy API'
    }).send(res);
})

export default router;