import table from '../databases/table';
import knex from '../databases/knex';
import { PaymentTransaction } from '../core/types/order.type';

class PaymentTransactionModel {
  create(payload: PaymentTransaction): Promise<PaymentTransaction[]>{
    return knex(table.payment_transactions)
      .insert(payload)
      .returning('payment_transaction_id');
  }
}

export default new PaymentTransactionModel();
