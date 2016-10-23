import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';
import google from 'googleapis';

const router = new Router();

const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

fs
  .readdirSync(path.join('server', 'routes'))
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const routeName = file.substring(0, file.length - 3);
    // eslint-disable-next-line global-require
    const route = require(path.resolve(__dirname, file)).default;
    router.use(`/api/${routeName}`, route);
  });

router.use('/static', express.static(path.join(__dirname, '..', '..', 'static')));

router.get('/video/:id', (req, res) => {
  const videoId = req.params.id;
  req.io.sockets.in(videoId).emit('started_process', { success: true });
  youtube.videos.list({ part: 'snippet', id: videoId }, (err, video) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }

    const { title, thumbnails, channelTitle } = video.items[0].snippet;
    return res.status(200).json({
      title,
      thumbnails,
      channelTitle,
    });
  });
});

router.post('/chunk', (req, res) => {
  const { id, gifUrl, timeStart, timeEnd } = req.body;
  req.io.sockets.in(id).emit('chunk_received', { id, gifUrl, timeStart, timeEnd });
  res.sendStatus(200);
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'static', 'index.html'));
});

export default router;
