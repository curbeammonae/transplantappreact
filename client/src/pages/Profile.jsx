import { current } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} =useSelector((state) => state.user)
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4' >
      <img src={currentUser.avatar}  alt='profile' className='rounded-full h-24 w-24 object-cover m-auto'/>
    <input type='text' placeholder='username' className='border p-3 rounded-lg' />
    <input type='email' placeholder='email' className='border p-3 rounded-lg' />
    <input type='password' placeholder='password' className='border p-3 rounded-lg' />
    <button className='bg-slate-500 text-white rounded-lg'>Update</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700'>delete account</span>
      <span className='text-red-700'>sign out</span>
    </div>
    </div>
  )
}