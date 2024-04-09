import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class OrderController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await OrderService.create(req.body),
  }).send(res);
  }
}

export default new OrderController();
