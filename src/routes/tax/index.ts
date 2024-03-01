import { Router } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import TaxController from '../../controllers/tax.controller';
import validate from '../../middlewares/validate';
import schema from '../../schemas/tax.schema';

const router = Router();

router.post('/create', validate(schema), asyncHandler(TaxController.create));
router.put('/update', validate(schema), asyncHandler(TaxController.update));
router.delete('/delete', asyncHandler(TaxController.delete));
router.get('/list', asyncHandler(TaxController.list));

export default router;