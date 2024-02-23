import EventEmitter from 'node:events';
import { User } from '../core/types/access.type';
import {sendAuthenticateUserEmail, sendChangePasswordEmail, sendResetPasswordEmail} from '../helpers/mail';

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


/**
 * Emit event when user change password
 */
const eventChangePassword = 'user:changePassword';
eventEmitter.on(eventChangePassword, async (data: User) => {
  const { user_email } = data;

  if (user_email) {
    // send email
    sendChangePasswordEmail(user_email);
  }
})

export const emitChangePassword = (data: User) => eventEmitter.emit(eventChangePassword, data);



/**
 * Emit event when user reset password
 */
const eventResetPassword = 'user:resetPassword';
eventEmitter.on(eventResetPassword, async (data: User) => {
  const { user_email, user_password } = data;

  if (user_email && user_password) {
    // send email
    sendResetPasswordEmail(user_email, user_password);
  }
})

export const emitResetPassword = (data: User) => eventEmitter.emit(eventResetPassword, data);