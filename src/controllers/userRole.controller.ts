import { Request, Response } from 'express';
import userRoleService from '../services/userRole.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class MenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await userRoleService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await userRoleService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await userRoleService.delete(req.body),
    }).send(res);
  };
}

export default new MenuController();
