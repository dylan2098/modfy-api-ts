import { Request, Response } from 'express';
import userService from '../services/user.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class UserController {
  signUp = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await userService.signUp(req.body),
    }).send(res);
  };

  authenticateEmail = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await userService.authenticateEmail(req.params),
    }).send(res);
  }
}

export default new UserController();
