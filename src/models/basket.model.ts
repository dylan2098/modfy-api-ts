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
    const collect = ['basket_id', 'basket_items', 'billing_id', 'basket_updated_at'];

    let resp: Basket[] = await knex.select(collect).from(table.baskets).where('basket_id', basket_id);

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
