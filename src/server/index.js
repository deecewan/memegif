import { Router } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import redisStore from 'connect-redis';
import morgan from 'morgan';

import developer from './lib/developer';

import Database from './models/index';
import routes from './routes';

const HOUR = 3600;

export default function (io) {
  const db = new Database();
  db.syncModels();

  const app = new Router();

  const RedisStore = redisStore(session);

  app.use((req, res, next) => {
    req.io = io; // eslint-disable-line
    next();
  });
  app.use(morgan('dev'));
  app.use(developer);
  app.use(cookieParser(process.env.SESSION_SECRET || 'youwontguessit'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    store: new RedisStore({
      host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
      port: process.env.REDIS_PORT_6379_TCP_PORT || '6379',
      ttl: 12 * HOUR,
    }),
    secret: process.env.SESSION_SECRET || 'youwontguessit',
    resave: true,
    saveUninitialized: true,
  }));

  app.use((req, res, next) => {
    // debug middleware
    next();
  });

  app.use(routes);

  app.use((err, req, res, next) => {
    console.log(err);
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json(err);
    }
    res.status(500).json({ message: 'An unexpected error has occurred.' +
    '  Please refresh and try again.' });
    return next();
  });

  return app;
}
