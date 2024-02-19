import { Router, Request, Response } from 'express';
import { SuccessResponse } from '../utils/success.response';
import userRoute from './access/user.route';
import roleRoute from './access/role.route';
import menuRoute from './access/menu.route';
import userRoleRoute from './access/userRole.route';
import roleMenuRoute from './access/roleMenu.route';

const router = Router();

router.use('/v1/api', roleRoute);
router.use('/v1/api', menuRoute);
router.use('/v1/api', userRoleRoute);
router.use('/v1/api', roleMenuRoute);
router.use('/v1/api', userRoute);

// default route
router.get('/', (req: Request, res: Response) => {
  new SuccessResponse({
    message: 'Welcome to Modfy API',
    metadata: []
  }).send(res);
});

export default router;
