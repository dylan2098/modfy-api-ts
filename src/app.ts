import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import limiter from './middlewares/limiter';
import router from './routes';
import { ResponseType } from './core/types/response.type';
import _ from 'lodash';
import utils from './utils/utils';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use((req, res, next) => {
  const delay = parseInt(process.env.DELAY || '0');
  setTimeout(next, delay);
});

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(limiter);



// utf8
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.use((req, res, next) => {
  const error: any = new Error('Not Found');
  error.code = 404;
  next(error);
});

// manage errors
app.use((error: ResponseType, req: Request, res: Response, next: NextFunction) => {
  const code = (_.isInteger(error.code) && error.code) || 500;

  const body: ResponseType = {
    error: true,
    code: code,
    message: error.message || 'Internal Server Error',
    metadata: [],
  };

  if (utils.environment() === 'development' && process.env.DEBUG?.toLowerCase() === 'true') {
    if (error.stack && typeof error.stack === 'string') {
      body.stack = error.stack.split('\n').map((line: string) => line.trim());
    }
  }

  return res.status(code).json(body);
});

export default app;
