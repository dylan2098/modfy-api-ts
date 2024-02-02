import { Request, Response } from 'express';
import roleService from '../services/role.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class RoleController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await roleService.create(req.body),
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await roleService.getAll(),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await roleService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await roleService.delete(req.body),
    }).send(res);
  };
}

export default new RoleController();
