import { Router } from 'express';
import userRoute from './user.route';
import roleRoute from './role.route';
import userRoleRoute from './userRole.route';
import roleMenuRoute from './roleMenu.route';
import { permissions } from '../../utils/auth.util';
import { ROLE } from '../../core/access/role.core';

const router = Router();

router.use('/roles', permissions([ROLE.ADMIN]), roleRoute);
router.use('/user-role', userRoleRoute);
router.use('/role-menu', roleMenuRoute);
router.use('/', userRoute);

export default router;
