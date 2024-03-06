import { Router } from 'express';
import userRoute from './user.route';
import roleRoute from './role.route';
import userRoleRoute from './userRole.route';
import roleMenuRoute from './roleMenu.route';
import { permissions } from '../../utils/auth.util';
import { ROLE } from '../../core/role.core';

const router = Router();

router.use('/roles', permissions([ROLE.ADMIN]), roleRoute);
router.use('/user-role', permissions([ROLE.ADMIN]), userRoleRoute);
router.use('/role-menu', permissions([ROLE.ADMIN]), roleMenuRoute);
router.use('/', userRoute);

export default router;
