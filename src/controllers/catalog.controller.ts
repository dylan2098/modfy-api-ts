import { Request, Response } from 'express';
import CatalogService from '../services/catalog.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class CatalogController {
    create = async (req: Request, res: Response) => {
        new CreatedSuccessResponse({
            metadata: await CatalogService.create(req.body),
        }).send(res);
    };

    list = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CatalogService.getAll(),
        }).send(res);
    };

    update = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CatalogService.update(req.body),
        }).send(res);
    };

    delete = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CatalogService.delete(req.body),
        }).send(res);
    };
}

export default new CatalogController();
