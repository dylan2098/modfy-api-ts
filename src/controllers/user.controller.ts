import { Request, Response } from 'express';
import userService from '../services/user.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class UserController {
  signUp = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: (await userService.signUp(req.body)) as any,
    }).send(res);
  };

  authenticateEmail = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: (await userService.(req.params)) as any,
    }).send(res);
  }
}

export default new UserController();
