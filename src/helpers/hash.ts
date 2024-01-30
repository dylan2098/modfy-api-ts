import bcrypt from 'bcrypt';

const saltRound = parseInt(process.env.GEN_SALT || '10');

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(password, salt);
}

export function compare(password: string, userPassword: string) {
  return bcrypt.compare(password, userPassword);
}
