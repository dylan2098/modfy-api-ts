import AddressController from '../../controllers/address.controller';
import asyncHandler from '../../helpers/asyncHandler';
import { Router } from 'express';
import schema from '../../schemas/address.schema';
import validate from '../../middlewares/validate';
const router = Router();

/**
 * handle user address
 */
router.post('/create-address-book', asyncHandler(AddressController.createAddressBook));



/**
 * handle address
 */
router.post('/create', validate(schema),  asyncHandler(AddressController.create));
router.put('/update', validate(schema), asyncHandler(AddressController.update));
router.delete('/delete', asyncHandler(AddressController.delete));

export default router;
