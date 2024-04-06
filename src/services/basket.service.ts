import { Basket } from '../core/types/basket.type';
import BasketModel from '../models/basket.model';
import {
  BadRequestError,
} from '../utils/error.response';

class BasketService {
  create(payload: Basket) {
    try {
      if(!payload || !payload.basket) {
        throw new BadRequestError('Data invalid');
      }

      const basket = payload.basket;

      return BasketModel.createBasket({ basket });
    } catch (error) {
      throw error;
    }
  }

  update(payload: Basket) {
    try {
      if(!payload || !payload.basket_id || !payload.basket) {
        throw new BadRequestError('Data invalid');
      }

      const basket = payload.basket;

      return BasketModel.updateBasket({ basket_id: payload.basket_id, basket });
    } catch (error) {
      throw error;
    }
  }

  find(payload: Basket) {
    try {
      if(!payload || !payload.basket_id) {
        throw new BadRequestError('Data invalid');
      }

      return BasketModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  delete(payload: Basket) {
    try {
      if(!payload || !payload.basket_id) {
        throw new BadRequestError('Data invalid');
      }

      return BasketModel.deleteBasket(payload);
    } catch (error) {
      throw error;
    }
  }

  addBillingToBasket(payload: Basket) {
    try {
      if(!payload || !payload.basket_id || !payload.billing_id) {
        throw new BadRequestError('Data invalid');
      }

      // return BasketModel.addBillingToBasket(payload);
    } catch (error) {
      throw error;
    }
  }
}

export default new BasketService();
