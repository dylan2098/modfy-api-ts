import { Request, Response } from 'express';
import BasketService from '../services/basket.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class BasketController {
  addBasket = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await BasketService.create(req.body),
    }).send(res);
  };

  getBasket = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await BasketService.find({
        basket_id: req.params.basketId,
      }),
    }).send(res);
  }

  updateBasket = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await BasketService.update(req.body),
    }).send(res);
  }

  deleteBasket = async (req: Request, res: Response) => {
    new SuccessResponse({
      metadata: await BasketService.delete({
        basket_id: req.params.basketId,
      }),
    }).send(res);
  }
}

export default new BasketController();
