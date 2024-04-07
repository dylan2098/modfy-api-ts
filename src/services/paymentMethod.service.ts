import { PaymentMethod } from '../core/types/paymentMethod.type';
import PaymentMethodModel from '../models/paymentMethod.model';
import {
  BadRequestError,
} from '../utils/error.response';

class PaymentMethodService {
  addPaymentMethod = async (payload: PaymentMethod) => {
    try {
      if(!payload) {
        throw new BadRequestError('Data invalid');
      }

      const payloadPaymentMethod = {
        payment_method_name: payload.payment_method_name,
      }

      const paymentMethod = await PaymentMethodModel.addPaymentMethod(payloadPaymentMethod);

      // add paymentMethod to basket
      const result = await PaymentMethodModel.addPaymentMethodToBasket({
        payment_method_id: paymentMethod[0].payment_method_id,
        basket_id: payload.basket_id
      })

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentMethodService();
