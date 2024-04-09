import { Order } from '../core/types/order.type';
import OrderModel from '../models/order.model';
import PaymentTransactionModel from '../models/paymentTransaction.model';
import {
  BadRequestError,
} from '../utils/error.response';

class OrderService {
  create = async (payload: Order) => {
    try {
      if(!payload || !payload.order_items || !payload.billing_id || !payload.shipping_id || !payload.payment_method_id) {
        throw new BadRequestError('Create order failed');
      }

      payload.order_items = JSON.stringify(payload.order_items);
      const orders: Order[] = await OrderModel.create(payload);

      if(!orders || !orders[0].order_id) {
        throw new BadRequestError('Create order failed');
      }

      const order_id = orders[0].order_id;

      const resPTX = await PaymentTransactionModel.create({
        order_id,
        payment_method_id: payload.payment_method_id
      })

      return resPTX;
    } catch (error) {
      throw error;
    }
  }

  search = async (payload: Order) => {
    try {
      if(!payload || !payload.order_transaction_id) {
        throw new BadRequestError('Data invalid');
      }

      return OrderModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
