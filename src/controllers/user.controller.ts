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

  changePassword = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.changePassword({
        userId: req.userId,
        body: req.body
      })
    }).send(res);
  }

  getProfile = async (req: CustomRequest, res: Response) => {

    if(!req.userId) {
      throw new Error('User not found');
    }
    
    new SuccessResponse({
      metadata: await UserService.getProfile(req.userId)
    }).send(res);
  }

  resetPassword = async (req: CustomRequest, res: Response) => {
    new SuccessResponse({
      metadata: await UserService.resetPassword(req.body)
    }).send(res);
  }
}

export default new UserController();