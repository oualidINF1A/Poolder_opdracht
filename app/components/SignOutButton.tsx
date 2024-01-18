import React from 'react'

const SignOutButton = () => {
  return (
    <form action="/auth/signout" method='post'>
        <button
        type='submit'
        className='hover:bg-gray-200 p-1 rounded hover:border-black border hover:text-black font-bold bg-black text-white border-gray-500'
        >
        Sign Out
        </button>
    </form>
  )
}

export default SignOutButton
