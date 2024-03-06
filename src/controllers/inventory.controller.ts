import { Request, Response } from 'express';
import InventoryService from '../services/inventory.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class InventoryController {
    create = async (req: Request, res: Response) => {
        new CreatedSuccessResponse({
            metadata: await InventoryService.create(req.body),
        }).send(res);
    };

    list = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await InventoryService.getAll(),
        }).send(res);
    };

    update = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await InventoryService.update(req.body),
        }).send(res);
    };

    delete = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await InventoryService.delete(req.body),
        }).send(res);
    };
}

export default new InventoryController();
