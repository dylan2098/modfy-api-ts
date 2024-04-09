import { Router, Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../utils/success.response';
import accessRoute from './access';
import menuRoute from './menu';
import { authentication, permissions } from '../utils/auth.util';
import { ROLE } from '../core/role.core';
import addressRoute from './address';
import productRoute from './product';
import catalogRoute from './catalog';
import categoryRoute from './category';
import taxRoute from './tax';
import inventoryRoute from './inventory';
import basketRoute from './basket';
import billingRoute from './billing';
import shippingRoute from './shipping';
import paymentMethodRoute from './paymentMethod';
import orderRoute from './order';

const router = Router();

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    metadata: [],
    message: 'Welcome to the API'
  }).send(res);
});

router.use((req: Request, res: Response, next: NextFunction) => {
  const excludeAuthorize = [
    '/access/login', 
    '/access/signup', 
    '/access/active', 
    '/access/delete-token-expired',
    '/access/reset-password',
    '/category/list',
    '/catalog/list',
    '/product/get-products-by-category',
    '/product/',
    '/basket/',
    '/billing/',
    '/shipping/',
    '/payment-method/',
    '/order'
  ];

  const isExcludedPath = excludeAuthorize.some(excludedPath => req.path.includes(excludedPath));
  if(isExcludedPath) {
    return next();
  }

  return authentication(req, res, next);
})

router.use('/v1/api/catalog', catalogRoute);
router.use('/v1/api/access', accessRoute);
router.use('/v1/api/category', categoryRoute);
router.use('/v1/api/product', productRoute);
router.use('/v1/api/menus', permissions([ROLE.ADMIN]), menuRoute);
router.use('/v1/api/address', permissions([ROLE.ADMIN, ROLE.CUSTOMER]), addressRoute);
router.use('/v1/api/tax', permissions([ROLE.ADMIN]), taxRoute);
router.use('/v1/api/inventory', permissions([ROLE.ADMIN]), inventoryRoute);
router.use('/v1/api/basket', basketRoute);
router.use ('/v1/api/billing', billingRoute);
router.use ('/v1/api/shipping', shippingRoute);
router.use ('/v1/api/payment-method', paymentMethodRoute);
router.use ('/v1/api/order', orderRoute);

export default router;
