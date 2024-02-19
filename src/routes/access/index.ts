import { Router } from 'express';
import userRoute from './user.route';
import roleRoute from './role.route';
import userRoleRoute from './userRole.route';
import roleMenuRoute from './roleMenu.route';

const router = Router();

router.use('/roles', roleRoute);
router.use('/user-role', userRoleRoute);
router.use('/role-menu', roleMenuRoute);
router.use('/', userRoute);

export default router;
