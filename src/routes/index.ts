import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../utils/success.response';
import userRoute from './access/user.route';
import roleRoute from './access/role.route';

const router = Router();

// setup list routes
const listRoutes = [userRoute, roleRoute];

// setup path for routes
for(let i = 0; i < listRoutes.length; i++) {
  router.use('/v1/api', listRoutes[i]);
}

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Welcome to Modfy API',
  }).send(res);
});

export default router;
