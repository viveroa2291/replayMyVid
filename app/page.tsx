"use client";
import { useState, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import axios from 'axios';
import logo from './images/logo.png';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [iframeSrc, setIframeSrc] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleReplayClick = async (event: MouseEvent<HTMLButtonElement>) => {
    // YouTube URL pattern
    const youtubePattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    // Rumble URL pattern
    const rumblePattern = /rumble\.com\/v([a-zA-Z0-9_-]+)-/;
    console.log('VideoURL: ' + videoUrl);
    
  if (rumblePattern.test(videoUrl)) {
    try {
      const response = await axios.get('/api/getRumbleEmbedUrl', {
        params: {url: videoUrl},
      });
      const embedUrl = response.data.embedUrl;
      
      if(embedUrl) {
        setIframeSrc(embedUrl);
        return;
      }
    }
    catch (error) {
      console.log('There was no connection', error);
    }
      const videoId = videoUrl.match(rumblePattern)?.[1];      
      alert('Entered inside the Rumble');
      if (videoId) {
        setIframeSrc(`https://rumble.com/embed/v${videoId}/?pub=4`);
        return;
      }
    }
    else if (youtubePattern.test(videoUrl)) {
      const videoId = videoUrl.match(youtubePattern)?.[1];      
      if (videoId) {
        const embedUrl = generateEmbedUrl(videoId);
        setIframeSrc(embedUrl);
        return;
      }
    } 
    setIframeSrc(''); // Clear iframe if URL is not valid
    alert('Link is not valid');
  };
  const generateEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}`;
  };
  return (
    <main>
      <Image src={logo} className='mx-auto' width={250} height={250} alt="This is the logo of my site." />
      <p className='text-center'>Your Music... No Interruptions</p>
      <div className='flex flex-col items-center mt-8'>
        <form action="">
          <input className='border-solid border-2 border-light-blue-500 h-9 w-96 text-center' type="text" name='link' placeholder='Enter the URL...' value={videoUrl} onChange={handleInputChange} />
        </form>          
        <button className='p-2 mt-2 bg-red-700 text-center hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-600 font-serif rounded text-sm text-white' type="button" onClick={handleReplayClick}>REPLAY</button>
        {iframeSrc && (
          <iframe className='' width="640" height="360" src={iframeSrc} allowFullScreen title="Video player"/>
        )}
      </div>
      <p className='text-center mt-10'>Watch your favorite YouTube/Rumble video over and over again without pressing replay (:</p>
    </main>
  );
}