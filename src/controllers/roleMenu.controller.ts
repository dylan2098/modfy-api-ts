import { Request, Response } from 'express';
import RoleMenuService from '../services/roleMenu.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class RoleMenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await RoleMenuService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await RoleMenuService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await RoleMenuService.delete(req.body),
    }).send(res);
  };
}

export default new RoleMenuController();
