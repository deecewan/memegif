import fs from 'fs';
import path from 'path';

export default (req, res, next) => {
  const developerDetails = {};
  developerDetails.branch = fs.readFileSync(path.resolve('.git', 'HEAD'))
    .toString().replace('ref: refs/heads/', '').trim();

  req.io.sockets.emit('dev_update', developerDetails);
  next();
};
