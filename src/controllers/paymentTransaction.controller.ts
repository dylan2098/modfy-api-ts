import { Request, Response } from 'express';
import PaymentTransactionService from '../services/paymentTransaction.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class PaymentTransactionController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await PaymentTransactionService.create(req.body),
    }).send(res);
  };
}

export default new PaymentTransactionController();
