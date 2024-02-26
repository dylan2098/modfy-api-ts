import {Router} from 'express';
import { ROLE } from '../../core/access/role.core';
import taxRoute from './tax.route';
import { permissions } from '../../utils/auth.util';


const router = Router();

router.use('/tax', permissions([ROLE.ADMIN]), taxRoute);

export default router;