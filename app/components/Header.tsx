'use client';
import React from 'react'
import SignOutButton from './SignOutButton'
import {useRouter} from 'next/navigation'

const Header = () => {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center mx-[5%]'>
        <h1 onClick={() => router.push(`/`)} className='hover:cursor-pointer md:text-4xl text-xl font-bold my-4 '>Transaction tracker</h1>
        <div className=''>
            <SignOutButton/>
        </div>
    </div>
  )
}

export default Header
