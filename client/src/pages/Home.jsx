import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className=''>
      <section className=''>
      <h1 className='text-center text-[100px] m-10 text-[#FEF2E6]'>Welcome to TransPLANT. A site designed for people interested in a plant based diet.</h1>
      </section>
      <section className='bg-[#FEF2E6] h-[20rem] pt-5'>
        <h2 className=' text-[#126F63] text-[62px] text-center'>Changing Lives One Recipe At A Time.</h2>
        

        <div class="flex justify-center items-center pt-4">
        <Link to='/about'>

<button className='bg-[#D7816D] text-[#FEF2E6] p-4 rounded-lg text-[20px] '>About</button>
</Link>
        
</div>
        
      </section>
      </div>
  )
}
