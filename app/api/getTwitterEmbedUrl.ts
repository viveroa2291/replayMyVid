/*
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;
  const twitterUrl = new URL(url);
  const videoId = twitterUrl.pathname.split('/')[2];
  const response = await axios.get(`https://x.com/i/videos/${videoId}`);
  const videoUrl = response.data.video_url;
  const embedUrl = `https://x.com/i/videos/${videoId}`;
  res.json({ embedUrl });
}
*/