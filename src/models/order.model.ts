import table from '../databases/table';
import knex from '../databases/knex';
import { Order } from '../core/types/order.type';

class OrderModel {
  create(payload: Order) : Promise<Order[]> {
    return knex(table.orders).returning(['order_transaction_id', 'order_id']).insert(payload);
  }

  async findOne(payload: Order) : Promise<Order> {
    const { order_transaction_id } = payload;

    const column = [
      'Orders.*', 
      'Billings.*', 
      'Shippings.*', 
      'PaymentMethods.*'
    ]

    let resp: Order = await knex.select(column)
                              .from(table.orders)
                              .where('order_transaction_id', order_transaction_id)
                              .innerJoin('Billings', 'Orders.billing_id', 'Billings.billing_id') 
                              .innerJoin('Shippings', 'Orders.shipping_id', 'Shippings.shipping_id') 
                              .innerJoin('PaymentMethods', 'Orders.payment_method_id', 'PaymentMethods.payment_method_id') 
                              ;
    return resp;
  }
}

export default new OrderModel();
