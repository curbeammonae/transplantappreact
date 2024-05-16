import React from 'react'
import { Link } from 'react-router-dom'
import foodone from '../assets/images/food1.png'
import foodtwo from '../assets/images/food2.jpg'

export default function Home() {
  return (
    <div className=''>
      <section className='flex justify-center mt-20 '>
      <h1 className='max-[1200px]:text-[40px]   text-[60px] m-10 text-[#49a3f1] content-center '>Welcome to TransPLANT.<br></br> A site designed for people <br></br>interested in a plant based diet.</h1>
      <img src={foodtwo} className='w-[30rem] h-[30rem] mt-6 mr-6 rounded-md'/>
      </section>
      <section className='max-[1200px]:h-[25rem]  h-[20rem] pt-5'>
      <p className=' text-center text-[40px] m-10 text-[#49a3f1] italic	' >Changing Lives One Meal At A Time</p>

       
        

        <div class="flex justify-center items-center pt-4">
        <Link to='/signup'>

<button className=' text-[#18a922] p-4 rounded-lg text-[20px] border-solid border-2 border-black '>Join</button>
</Link>
        
</div>
        
      </section>
      </div>
  )
}
