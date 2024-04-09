import table from '../databases/table';
import knex from '../databases/knex';
import { Basket } from '../core/types/basket.type';

class BasketModel {
  createBasket(payload: Basket) {
    const hashBasket = JSON.stringify(payload.basket);    
    return knex(table.baskets).returning('basket_id').insert({
      basket_items: hashBasket
    });
  }

  updateBasket(payload: Basket) {
    const hashBasket = JSON.stringify(payload.basket);    
    return knex(table.baskets).where('basket_id', payload.basket_id).update({
      basket_items: hashBasket
    });
  }

  deleteBasket(payload: Basket) {
    return knex(table.baskets).where('basket_id', payload.basket_id).del();
  }

  async findOne(payload: Basket) {
    const { basket_id } = payload;
    const collect = [
      'basket_id', 
      'basket_items', 
      'Billings.billing_id', 
      'Billings.customer_email',
      'Billings.customer_first_name',
      'Billings.customer_last_name',
      'Billings.customer_phone_number',
      'Billings.customer_shipping_address',
      'Billings.customer_note',
      'Shippings.shipping_id',
      'Shippings.shipping_method',
      'Shippings.shipping_carrier', 
      'Shippings.shipping_tracking_number',
      'Shippings.shipping_date',
      'PaymentMethods.payment_method_id',
      'PaymentMethods.payment_method_name',
      'basket_updated_at'
    ];

    let resp: Basket[] = await knex.select(collect)
                              .from(table.baskets)
                              .where('basket_id', basket_id)
                              .innerJoin('Billings', 'Baskets.billing_id', 'Billings.billing_id') 
                              .innerJoin('Shippings', 'Baskets.shipping_id', 'Shippings.shipping_id') 
                              .innerJoin('PaymentMethods', 'Baskets.payment_method_id', 'PaymentMethods.payment_method_id') 
                              ;

    if(resp.length === 0) {
      return [];
    }

    let basket = resp[0];

    if(basket.basket_items) {
      basket.basket = JSON.parse(basket.basket_items);
      delete basket.basket_items;
    }

    return basket;
  }
}

export default new BasketModel();
