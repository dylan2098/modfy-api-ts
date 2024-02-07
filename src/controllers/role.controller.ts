import { Request, Response } from 'express';
import RoleService from '../services/role.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class RoleController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await RoleService.create(req.body),
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await RoleService.getAll(),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await RoleService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await RoleService.delete(req.body),
    }).send(res);
  };
}

export default new RoleController();
