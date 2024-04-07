import { Request, Response } from 'express';
import PaymentMethodService from '../services/paymentMethod.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class PaymentMethodController {
  addPaymentMethod = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await PaymentMethodService.addPaymentMethod(req.body),
  }).send(res);
  }
}

export default new PaymentMethodController();


