import table from '../databases/table';
import knex from '../databases/knex';
import { PaymentMethod } from '../core/types/paymentMethod.type';
import { Basket } from '../core/types/basket.type';

class PaymentMethodModel {
  create(payload: PaymentMethod): Promise<PaymentMethod[]>{
    return knex(table.payment_methods)
      .insert(payload)
      .returning('payment_method_id');
  }

  addPaymentMethodToBasket(payload: Basket): Promise<Basket[]>{
    return knex(table.baskets).where('basket_id', payload.basket_id).update({
      payment_method_id: payload.payment_method_id
    });
  }
}

export default new PaymentMethodModel();
