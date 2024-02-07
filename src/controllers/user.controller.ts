import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class UserController {
  signUp = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await UserService.signUp(req.body),
    }).send(res);
  };

  authenticateEmail = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.authenticateEmail(req.params),
    }).send(res);
  }

  login = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.login(req.body),
    }).send(res);
  }
}

export default new UserController();
