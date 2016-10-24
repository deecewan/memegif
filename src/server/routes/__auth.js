import { Router } from 'express';
import { passport } from '../lib/passport';

const router = new Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.sendStatus(401);
    }
    return req.logIn(user, error => {
      if (error) {
        return next(error);
      }
      return res.status(200).json(user.redacted);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.sendStatus(201);
});

export default router;
