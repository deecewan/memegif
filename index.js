import 'babel-polyfill';
import chokidar from 'chokidar';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import env from 'dotenv';
import Socket from 'socket.io';

env.config();

const app = express();

const server = http.createServer(app);
const io = new Socket(server, { serveClient: false });

io.on('connection', socket => {
  console.log('connection received');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('register', data => {
    socket.join(data.videoId);
  });
});

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack.config.babel').default; // eslint-disable-line global-require

  const compiler = webpack(config);

// Serve hot-reloading bundle to client
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use((req, res, next) => {
    require('./server').default(io)(req, res, next); // eslint-disable-line global-require
  });

  const watcher = chokidar.watch('./server');

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(id => {
        if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
      });
    });
  });

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', () => {
    console.log('Clearing /client/ module cache from server');
    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });
} else {
  /* eslint-disable global-require, import/no-unresolved */
  const routes = require('./out').default;
  /* eslint-enable */

  app.use(routes);
}

server.listen(3000, '0.0.0.0', err => {
  if (err) throw err;

  const addr = server.address();

  console.log('Listening at http://%s:%d', addr.address, addr.port);
});
