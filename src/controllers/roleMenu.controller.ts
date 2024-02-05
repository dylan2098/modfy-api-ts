import { Request, Response } from 'express';
import roleMenuService from '../services/roleMenu.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class RoleMenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await roleMenuService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await roleMenuService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await roleMenuService.delete(req.body),
    }).send(res);
  };
}

export default new RoleMenuController();
