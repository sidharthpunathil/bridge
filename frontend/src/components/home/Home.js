import React from 'react'
import Image from './Image'
export default function Home() {
  return (
    <div className='pb-8'>
       <Image /> 
       <div className='text-center'>
       <a href='/generate'>
       <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Get Started</button>
       </a>
       </div>
    </div>
  )
}
