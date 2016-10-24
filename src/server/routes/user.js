import { Router } from 'express';
import Database from '../models';
import { hashPassword } from '../lib/hasher';

const router = new Router();
const db = new Database();
const User = db.models.User;

router.get('/', async (req, res) => {
  // return current user
  if (!req.user) {
    return res.sendStatus(401);
  }
  return res.status(200).json(req.user.redacted);
});

// make a new user
router.post('/', async (req, res, next) => {
  // get the necessary fields from the request
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // we have a user!
  // log them in
  return req.login(user, err => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(user.redacted);
  });
});

export default router;
