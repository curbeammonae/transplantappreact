import React from 'react'
import foodimg5 from '../assets/images/food5.jpg'
import foodimg4 from '../assets/images/food4.jpg'
import foodimg6 from '../assets/images/food6.jpg'

export default function About() {
  return (
    <div className='mr-48 ml-48'><p className='max-[1200px]:text-[20px] text-[40px] text-center text-[#49a3f1] mt-16'>
    Your ultimate destination for embracing the vibrant world of plant-based eating! Whether you're a curious newcomer or a seasoned enthusiast, our platform offers an abundance of resources to empower your journey towards a healthier, more sustainable lifestyle. Discover delicious recipes to fuel your transition to plant-powered living, all while nurturing your body, mind, and the planet.</p>
    <div className='flex justify-between mt-14 mb-10 gap-10 '>

    <img src={foodimg5} className='w-[30rem] h-[30rem] rounded-md'/>
    <img src={foodimg4} className='w-[30rem] h-[30rem] rounded-md'/>
    <img src={foodimg6} className='w-[30rem] h-[30rem] rounded-md'/>
    </div>
    </div>
  )
}
