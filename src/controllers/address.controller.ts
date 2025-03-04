import { Request, Response } from 'express';
import AddressService from '../services/address.service';
import { CreatedSuccessResponse, SuccessResponse } from '../utils/success.response';
import { CustomRequest } from '../core/interfaces/request';

class AddressController {
  create = async (req: Request, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await AddressService.create(req.body),
    }).send(res);
  };

  update = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await AddressService.update(req.body),
    }).send(res);
  };

  delete = async (req: Request, res: Response) => {
    new SuccessResponse ({
      metadata: await AddressService.delete(req.body),
    }).send(res);
  };


  createAddressBook = async (req: CustomRequest, res: Response) => {
    new CreatedSuccessResponse({
      metadata: await AddressService.createAddressBook({
        ...req.body,
        user_id: req.userId,
      }),
    }).send(res);
  }
}

export default new AddressController();
