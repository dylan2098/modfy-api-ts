import { Request, Response } from 'express';
import ShippingService from '../services/shipping.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class ShippingController {
  addShipping = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await ShippingService.addShipping(req.body),
  }).send(res);
  }
}

export default new ShippingController();
