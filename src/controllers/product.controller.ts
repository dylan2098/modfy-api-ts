import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';

class ProductController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await ProductService.create(req.body),
    }).send(res);
  };

  list = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await ProductService.getAll(),
    }).send(res);
  };

  getProduct = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await ProductService.getProduct({product_id: req.params.id}),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await ProductService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await ProductService.delete(req.body),
    }).send(res);
  };
}

export default new ProductController();
