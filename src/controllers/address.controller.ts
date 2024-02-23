import { Request, Response } from 'express';
import AddressService from '../services/address.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class MenuController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await AddressService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await AddressService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await AddressService.delete(req.body),
    }).send(res);
  };
}

export default new MenuController();
