import rateLimit from 'express-rate-limit';

const min = parseInt(process.env.MIN_REQUEST || '1');
const limit = parseInt(process.env.LIMIT_REQUEST || '100');

export default rateLimit({
  windowMs: min * 60 * 1000,
  max: limit,
  statusCode: 429,
  message: {
    error: true,
    code: 429,
    msg: 'Too many requests',
  },
});
