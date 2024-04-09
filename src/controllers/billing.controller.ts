import { Request, Response } from 'express';
import BillingService from '../services/billing.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class BillingController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await BillingService.create(req.body),
  }).send(res);
  }
}

export default new BillingController();
