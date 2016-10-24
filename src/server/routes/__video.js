import { Router } from 'express';
import google from 'googleapis';
import Database from '../models';

const router = new Router();
const db = new Database();

const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

router.get('/:id', (req, res) => {
  const videoId = req.params.id;
  req.io.sockets.in(videoId).emit('started_process', { success: true });
  // create a search and attach it to this user
  youtube.videos.list({ part: 'snippet', id: videoId }, (err, video) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }

    const { title, thumbnails, channelTitle } = video.items[0].snippet;
    db.models.Search.create({
      type: 'url',
      term: videoId,
      youtubeTitle: title,
    }).then(search => {
      if (req.user) {
        search.setUser(req.user.id);
      }
    });
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
