import { PaymentTransaction } from '../core/types/order.type';
import PaymentTransactionModel from '../models/paymentTransaction.model';
import { BadRequestError } from '../utils/error.response';

class PaymentTransactionService {
  create = async (payload: PaymentTransaction) => {
    try {
      if(!payload) {
        throw new BadRequestError('Data invalid');
      }

      const payloadPaymentTransaction = {
        order_id: payload.order_id,
        payment_method_id: payload.payment_method_id,
      }

      const result = await PaymentTransactionModel.create(payloadPaymentTransaction);
      return result;

    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentTransactionService();
