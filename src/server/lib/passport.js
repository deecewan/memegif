// mostly borrowed from https://github.com/deecewan/mashup/blob/master/server/lib/passport.js
//                                         ^^ my project

import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import Database from '../models';
import { verify } from './hasher';

const middleware = new Router();
const db = new Database();

middleware.use(passport.initialize());
middleware.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  db.models.User.findOne({
    where: { email },
    include: [db.models.Search],
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'Incorrect Email Address' });
    }
    return verify(password, user.password)
      .then(() => done(null, user))
      .catch(err =>
        // passwords don't match
        done(null, false, { message: err })
      );
  })
    .catch(done);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.models.User.findOne({
    where: {
      id,
    },
    include: [db.models.Search],
    order: [
      [db.models.Search, 'createdAt', 'desc'],
    ],
  })
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(done);
});

export {
  middleware,
  passport,
};
