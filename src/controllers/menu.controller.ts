import { Request, Response } from 'express';
import menuService from '../services/menu.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class MenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: (await menuService.create(req.body)) as any,
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: (await menuService.getAll()) as any,
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: (await menuService.update(req.body)) as any,
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: (await menuService.delete(req.body)) as any,
    }).send(res);
  };
}

export default new MenuController();
