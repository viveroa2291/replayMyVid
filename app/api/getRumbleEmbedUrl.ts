import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

type Data = {
  embedUrl?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'Invalid URL' });
    return;
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const embedUrl = $('iframe').attr('src');

    if (embedUrl) {
      res.status(200).json({ embedUrl });
    } else {
      res.status(404).json({ error: 'Embed URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the page' });
  }
}