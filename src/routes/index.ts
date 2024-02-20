import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../utils/success.response';
import accessRoute from './access';
import menuRoute from './menu';
import { authentication } from '../utils/auth.util';

const router = Router();

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
