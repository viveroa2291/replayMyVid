import Image from 'next/image'
import logo from './images/logo.png'
import { useRouter } from 'next/router'
export default function Home() {
  return (
    <main>
      <Image src={logo} className='mx-auto' width={250} height={250} alt="This is the logo of my site."/>
      <p className='text-center'>Your Music... No Interruptions</p>
      <div className='flex flex-col items-center mt-8'>
        <form action="">
          <input className='border-solid border-2 border-light-blue-500 h-9 w-96' type="text" name='link' placeholder='Enter the URL...'/>
          <button className='p-2 bg-red-700 text-center ml-2 hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-600 font-serif rounded text-sm text-white' type="submit">REPLAY</button>
        </form>
      </div>
      <p className='text-center mt-10'>Watch your favorite Youtube/Rumble video over and over again without pressing replay (:</p>
    </main>
  )
}
