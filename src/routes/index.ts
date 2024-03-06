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

const router = Router();

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Welcome to Modfy API',
    metadata: []
  }).send(res);
});

router.use((req: Request, res: Response, next: NextFunction) => {
  const excludeAuthorize = [
    '/access/login', 
    '/access/signup', 
    '/access/active', 
    '/access/delete-token-expired',
    '/access/reset-password'
  ];

  const isExcludedPath = excludeAuthorize.some(excludedPath => req.path.includes(excludedPath));
  if(isExcludedPath) {
    return next();
  }

  return authentication(req, res, next);
})

router.use('/v1/api/menus', permissions([ROLE.ADMIN]), menuRoute);
router.use('/v1/api/address', permissions([ROLE.ADMIN, ROLE.CUSTOMER]), addressRoute);
router.use('/v1/api/access', accessRoute);
router.use('/v1/api/tax', permissions([ROLE.ADMIN]), taxRoute);
router.use('/v1/api/catalog', permissions([ROLE.ADMIN]), catalogRoute);
router.use('/v1/api/category', permissions([ROLE.ADMIN]), categoryRoute);
router.use('/v1/api/product', productRoute);
router.use('/v1/api/inventory', permissions([ROLE.ADMIN]), inventoryRoute);

export default router;
