import { Response } from 'express';
import UserService from '../services/user.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';
import { CustomRequest } from '../core/interfaces/request';

class UserController {
  signUp = async (req: CustomRequest, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await UserService.signUp(req.body),
    }).send(res);
  };

  authenticateEmail = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.authenticateEmail(req.params),
    }).send(res);
  };

  login = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.login(req.body),
    }).send(res);
  };

  refreshToken = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.refreshToken({
        userId: req.userId,
        keyStore: req.keyStore,
        refreshToken: req.refreshToken
      }),
    }).send(res);
  };

  deleteTokenExpired = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.deleteTokenExpired(),
    }).send(res);
  }

  updateProfile = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.updateProfile({
        userId: req.userId,
        body: req.body
      })
    }).send(res);
  }
}

export default new UserController();