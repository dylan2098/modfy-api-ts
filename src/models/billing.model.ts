import table from '../databases/table';
import knex from '../databases/knex';
import { Billing } from '../core/types/billing.type';
import { Basket } from '../core/types/basket.type';

class BasketModel {
  addBilling(payload: Billing): Promise<Billing[]>{
    return knex(table.billings)
      .insert(payload)
      .returning('billing_id');
  }

  addBillingToBasket(payload: Basket): Promise<Basket[]>{
    return knex(table.baskets).where('basket_id', payload.basket_id).update({
      billing_id: payload.billing_id
    });
  }
}

export default new BasketModel();
