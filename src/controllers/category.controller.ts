import { Request, Response } from 'express';
import CategoryService from '../services/category.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class CategoryController {
    create = async (req: Request, res: Response) => {
        new CreatedSuccessResponse({
            metadata: await CategoryService.create(req.body),
        }).send(res);
    };

    list = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CategoryService.getAll(),
        }).send(res);
    };

    update = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CategoryService.update(req.body),
        }).send(res);
    };

    delete = async (req: Request, res: Response) => {
        new SuccessResponse({
            metadata: await CategoryService.delete(req.body),
        }).send(res);
    };
}

export default new CategoryController();
