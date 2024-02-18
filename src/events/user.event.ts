import EventEmitter from 'node:events';
import { User } from '../types/access.type';
import {sendAuthenticateUserEmail} from '../helpers/mail';

const eventEmitter = new EventEmitter();


/**
 * Emit event when register success
 */
const eventRegisterAccountSuccess = 'account:registerSuccess';
eventEmitter.on(eventRegisterAccountSuccess, async (data: User) => {
  const { user_email, user_id} = data;

  if (user_email && user_id) {
    sendAuthenticateUserEmail(user_email, user_id);
  }
})

export const emitRegisterSuccess = (data: User) => eventEmitter.emit(eventRegisterAccountSuccess, data);