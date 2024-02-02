import { Request, Response } from 'express';
import menuService from '../services/menu.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class MenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await menuService.create(req.body),
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await menuService.getAll(),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await menuService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await menuService.delete(req.body),
    }).send(res);
  };
}

export default new MenuController();
