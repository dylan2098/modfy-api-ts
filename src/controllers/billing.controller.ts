import { Request, Response } from 'express';
import BillingService from '../services/billing.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class BillingController {
  addBilling = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await BillingService.addBilling(req.body),
  }).send(res);
  }
}

export default new BillingController();
