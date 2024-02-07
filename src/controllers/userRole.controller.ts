import { Request, Response } from 'express';
import UserRoleService from '../services/userRole.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class UserRoleController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await UserRoleService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await UserRoleService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await UserRoleService.delete(req.body),
    }).send(res);
  };
}

export default new UserRoleController();
