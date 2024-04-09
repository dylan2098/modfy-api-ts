import { Shipping } from '../core/types/shipping.type';
import ShippingModel from '../models/shipping.model';
import {
  BadRequestError,
} from '../utils/error.response';

class ShippingService {
  create = async (payload: Shipping) => {
    try {
      if(!payload) {
        throw new BadRequestError('Data invalid');
      }

      const payloadShipping = {
        shipping_method: payload.shipping_method,
        shipping_carrier: payload.shipping_carrier,
        shipping_tracking_number: payload.shipping_tracking_number,
        shipping_date: payload.shipping_date,
      }

      const shipping = await ShippingModel.create(payloadShipping);

      // add shipping to basket
      const result = await ShippingModel.addShippingToBasket({
        shipping_id: shipping[0].shipping_id,
        basket_id: payload.basket_id
      })

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new ShippingService();
