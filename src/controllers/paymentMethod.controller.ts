import { Request, Response } from 'express';
import PaymentMethodService from '../services/paymentMethod.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class PaymentMethodController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await PaymentMethodService.create(req.body),
  }).send(res);
  }
}

export default new PaymentMethodController();


