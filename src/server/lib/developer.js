import fs from 'fs';
import path from 'path';

export default (req, res, next) => {
  const developerDetails = {};
  if (process.env.NODE_ENV !== 'development') {
    return next();
  }
  developerDetails.branch = fs.readFileSync(path.resolve('.git', 'HEAD'))
    .toString().replace('ref: refs/heads/', '').trim();

  req.io.sockets.emit('dev_update', developerDetails);
  return next();
};
