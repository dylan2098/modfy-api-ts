import EventEmitter from 'node:events';
import { UserType } from '../types/access.type';
import {sendAuthenticateUserEmail} from '../helpers/mail';

const eventEmitter = new EventEmitter();

export const onRegisterSuccess = eventEmitter.on('registerSuccess', async (data: UserType) => {
  const { email, userNo} = data;

  if (email && userNo) {
    sendAuthenticateUserEmail(email, userNo);
  }
})

export const emitRegisterSuccess = (data: UserType) => eventEmitter.emit('registerSuccess', data);