import { Router } from 'express';

import addressRoute from '../address/address.route';

const router = Router();

router.use('/', addressRoute);

export default router;
