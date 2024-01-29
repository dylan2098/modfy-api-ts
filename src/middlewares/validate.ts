import { Request, Response, NextFunction } from 'express';
import ajv from 'ajv';

export default (schema) => (req: Request, res: Response, next: NextFunction) => {
  const validator = new ajv({ allErrors: true });
  const validate = validator.compile(schema);
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: validate.errors,
      metadata: [],
    });
  }

  return next();
};
