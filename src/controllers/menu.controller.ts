import { Request, Response } from 'express';
import MenuService from '../services/menu.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class MenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await MenuService.create(req.body),
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await MenuService.getAll(),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await MenuService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await MenuService.delete(req.body),
    }).send(res);
  };
}

export default new MenuController();
