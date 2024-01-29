import EventEmitter from 'node:events';
import { UserType } from '../types/user.type';

const eventEmitter = new EventEmitter();

export const onRegisterSuccess = eventEmitter.on('registerSuccess', (data) => {
  console.log('call on register success', data)
})

export const emitRegisterSuccess = (data: UserType) => eventEmitter.emit('registerSuccess', data);