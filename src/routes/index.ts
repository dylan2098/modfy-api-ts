import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../utils/success.response';
import accessRoute from './access';
import menuRoute from './menu';

const router = Router();

router.use('/v1/api/access', accessRoute);
router.use('/v1/api/menus', menuRoute);

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Welcome to Modfy API',
    metadata: []
  }).send(res);
});

export default router;
