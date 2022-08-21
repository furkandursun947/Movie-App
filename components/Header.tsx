import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='w-full mx-auto p-5 shadow-md'>
        <div className='flex justify-between max-w-screen-2xl mx-auto text-gray-600'>
            <div className='flex justify-center items-center space-x-5'>
                <Link href="/">
                    <h3 className='cursor-pointer font-extrabold italic text-orange-700'>Movies.</h3>
                </Link>
            </div>
            <div className='flex justify-center items-center space-x-5'>
            </div>
        </div>
    </header>
  )
}

export default Header