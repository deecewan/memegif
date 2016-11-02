import { Router } from 'express';
import google from 'googleapis';
import AWS, { SQS } from 'aws-sdk';
import chalk from 'chalk';
import Database from '../models';

AWS.config.update({ region: 'ap-southeast-2' });

const router = new Router();
const db = new Database();
const sqs = new SQS();
const youtube = google.youtube({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

function queueRequest(payload) {
  return new Promise((resolve, reject) => {
    sqs.sendMessage({
      MessageBody: JSON.stringify(payload),
      QueueUrl: 'https://sqs.ap-southeast-2.amazonaws.com/682081164011/host_gif_party',
    }, (err, data) => {
      if (err) {
        console.log(chalk.bgRed.white(err));
        console.log(err.stack);
        return reject('Failed to queue');
      }
      console.log(chalk.green.bold(`Successfully queued ${data.MessageId}`));
      return resolve();
    });
  });
}

router.get('/:id', (req, res) => {
  const videoId = req.params.id;
  // queue request
  queueRequest({ id: videoId })
    .then(() => {
      req.io.sockets.in(videoId).emit('started_process', { success: true });
    })
    .catch(() => {
      req.io.sockets.in(videoId).emit('started_process', { success: false });
    });
  // create a search and attach it to this user
  youtube.videos.list({ part: 'snippet', id: videoId }, (err, video) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }

    const { title, thumbnails, channelTitle } = video.items[0].snippet;
    console.log(chalk.underline.cyan('Processing started for', title, 'from', req.ip));
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
      videoId,
      title,
      thumbnails,
      channelTitle,
    });
  });
});

router.post('/', (req, res) => {
  const { id, gifUrl, timeStart, timeEnd } = req.body;
  console.log(chalk.blue(`received chunk for ${id}: ${gifUrl}`));
  req.io.sockets.in(id).emit('chunk_received', { id, gifUrl, timeStart, timeEnd });
  res.sendStatus(200);
});

export default router;
