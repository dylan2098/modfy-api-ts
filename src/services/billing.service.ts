import { Billing } from '../core/types/billing.type';
import BillingModel from '../models/billing.model';
import {
  BadRequestError,
} from '../utils/error.response';

class BillingService {
  create = async (payload: Billing) => {
    try {
      if(!payload || !payload.customer_email || !payload.customer_phone_number) {
        throw new BadRequestError('Data invalid');
      }

      const payloadBilling = {
        customer_email: payload.customer_email,
        customer_first_name: payload.customer_first_name,
        customer_last_name: payload.customer_last_name,
        customer_phone_number: payload.customer_phone_number,
        customer_shipping_address: payload.customer_shipping_address,
      }

      const billing = await BillingModel.create(payloadBilling);

      // add billing to basket
      const result = await BillingModel.addBillingToBasket({
        billing_id: billing[0].billing_id,
        basket_id: payload.basket_id
      })

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new BillingService();
