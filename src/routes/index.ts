import { Router, Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../utils/success.response';
import accessRoute from './access';
import menuRoute from './menu';
import { authentication } from '../utils/auth.util';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const excludeAuthorize = [
    '/access/login', 
    '/access/signup', 
    '/access/active', 
    '/access/delete-token-expired'
  ];

  const isExcludedPath = excludeAuthorize.some(excludedPath => req.path.includes(excludedPath));
  if(isExcludedPath) {
    return next();
  }

  return authentication(req, res, next);
})

router.use('/v1/api/menus', menuRoute);
router.use('/v1/api/access', accessRoute);

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Welcome to Modfy API',
    metadata: []
  }).send(res);
});

export default router;
