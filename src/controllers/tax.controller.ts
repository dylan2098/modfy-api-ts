import { Request, Response } from 'express';
import TaxService from '../services/tax.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class TaxController {
    create = async (req: Request, res: Response) => {
        new CreatedSuccessResponse({
            metadata: await TaxService.create(req.body),
        }).send(res);
    };

    list = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await TaxService.getAll(),
        }).send(res);
    };

    update = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await TaxService.update(req.body),
        }).send(res);
    };

    delete = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await TaxService.delete(req.body),
        }).send(res);
    };
}

export default new TaxController();
