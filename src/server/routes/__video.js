import { Router } from 'express';
import google from 'googleapis';

const router = new Router();

const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const { id, gifUrl, timeStart, timeEnd } = req.body;
  req.io.sockets.in(id).emit('chunk_received', { id, gifUrl, timeStart, timeEnd });
  res.sendStatus(200);
});

export default router;
