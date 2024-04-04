import { Request, Response } from 'express';
import BasketService from '../services/basket.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';
import { CustomRequest } from '../core/interfaces/request';

class BasketController {
  addBasket = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await BasketService.create(req.body),
    }).send(res);
  };
}

export default new BasketController();
