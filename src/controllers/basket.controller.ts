import { Request, Response } from 'express';
import CartService from '../services/basket.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';
import { CustomRequest } from '../core/interfaces/request';

class CartController {
  addCart = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await CartService.create(req.body),
    }).send(res);
  };
}

export default new CartController();
