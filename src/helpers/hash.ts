import bcrypt from 'bcrypt';
import Hashids from 'hashids/cjs';

const saltRound = parseInt(process.env.GEN_SALT || '10');

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(password, salt);
}

export function compare(password: string, userPassword: string) {
  return bcrypt.compare(password, userPassword);
}

export function encodeId(id: number) {
  const hashIdLength = process.env.HASHIDS_LENGTH;

  if (!hashIdLength) {
    return '';
  }

  const hashids = new Hashids(process.env.HASHIDS_SALT, parseInt(hashIdLength));
  return hashids.encode(id);
}

export function decodeId(id: string) {
  const hashIdLength = process.env.HASHIDS_LENGTH;

  if (!hashIdLength) {
    return '';
  }

  const hashids = new Hashids(process.env.HASHIDS_SALT, parseInt(hashIdLength));
  return parseInt(hashids.decode(id).toString());
}
