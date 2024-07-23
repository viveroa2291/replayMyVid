"use client";
import { useState, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import logo from './images/logo.png';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [iframeSrc, setIframeSrc] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleReplayClick = (event: MouseEvent<HTMLButtonElement>) => {
    // YouTube URL pattern
    const youtubePattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    // Rumble URL pattern
    const rumblePattern = /rumble\.com\/v\/([a-zA-Z0-9_-]+)(?:\/[^?]*|\?.*)?$/;
    console.log('VideoURL: ' + videoUrl);
    if (youtubePattern.test(videoUrl)) {
      const videoId = videoUrl.match(youtubePattern)?.[1];      
      alert('Entered inside the Youtube');
      if (videoId) {
        setIframeSrc(`https://www.youtube.com/embed/${videoId}`);
        return;
      }
    } else if (rumblePattern.test(videoUrl)) {
      const videoId = videoUrl.match(rumblePattern)?.[1];      
      alert('Entered inside the Rumble');
      if (videoId) {
        setIframeSrc(`https://rumble.com/embed/v${videoId}/?pub=4`);
        return;
      }
    }
    setIframeSrc(''); // Clear iframe if URL is not valid
    alert('Link is not valid');
  };
/*
function testRumblePattern(url: string): void {
  // Rumble URL pattern
  const rumblePattern = /rumble\.com\/v\/([a-zA-Z0-9_-]+)(?:\/[^?]*|\?.*)?$/;

  const match = url.match(rumblePattern);

  if (match) {
    console.log("Match found:", match[1]); // Logs the video ID
  } else {
    console.log("No match found.");
  }
}

// Test URLs
const testUrl1 = "https://rumble.com/v4u7lar-shelton-benjamin-makes-fun-of-yoshi-tatsu.html";
const testUrl2 = "https://rumble.com/v33p0t0-the-tragic-story-of-chris-benoit.html?e9s=rel_v1_b";

// Run tests
testRumblePattern(testUrl1);
testRumblePattern(testUrl2);
*/
  return (
    <main>
      <Image src={logo} className='mx-auto' width={250} height={250} alt="This is the logo of my site." />
      <p className='text-center'>Your Music... No Interruptions</p>
      <div className='flex flex-col items-center mt-8'>
        <form action="">
          <input className='border-solid border-2 border-light-blue-500 h-9 w-96 text-center' type="text" name='link' placeholder='Enter the URL...'
            value={videoUrl} onChange={handleInputChange}
          />
          <button className='p-2 bg-red-700 text-center ml-2 hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-600 font-serif rounded text-sm text-white' type="button" onClick={handleReplayClick}>REPLAY</button>
        </form>
        {iframeSrc && (
          <iframe width="640" height="360" src={iframeSrc} allowFullScreen title="Video player"/>
        )}
        { /*<iframe width="640" height="360" allowFullScreen src='https://rumble.com/embed/v4rpr6f/?pub=4'/> */}
      </div>
      <p className='text-center mt-10'>Watch your favorite YouTube/Rumble video over and over again without pressing replay (:</p>
    </main>
  );
}
