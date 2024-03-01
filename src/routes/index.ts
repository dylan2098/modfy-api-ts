import { Router, Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../utils/success.response';
import accessRoute from './access';
import menuRoute from './menu';
import { authentication, permissions } from '../utils/auth.util';
import { ROLE } from '../core/access/role.core';
import addressRoute from './address/address.route';
import productRoute from './product';
import taxRoute from './tax/tax.route';

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
router.use('/v1/api/products', productRoute);

export default router;
