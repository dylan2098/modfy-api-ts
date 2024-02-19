import { Router } from 'express';

import menuRoute from '../menu/menu.route';

const router = Router();

router.use('/', menuRoute);

export default router;
