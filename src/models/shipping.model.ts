import table from '../databases/table';
import knex from '../databases/knex';
import { Shipping } from '../core/types/shipping.type';
import { Basket } from '../core/types/basket.type';

class ShippingModel {
  addShipping(payload: Shipping): Promise<Shipping[]>{
    return knex(table.shippings)
      .insert(payload)
      .returning('shipping_id');
  }

  addShippingToBasket(payload: Basket): Promise<Basket[]>{
    return knex(table.baskets).where('basket_id', payload.basket_id).update({
      shipping_id: payload.shipping_id
    });
  }
}

export default new ShippingModel();
