import table from '../databases/table';
import knex from '../databases/knex';
import { Order } from '../core/types/order.type';

class OrderModel {
  create(payload: Order) : Promise<Order[]> {
    return knex(table.orders).returning(['order_transaction_id', 'order_id']).insert(payload);
  }
}

export default new OrderModel();
