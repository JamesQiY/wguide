import React, { useState, useEffect } from 'react'

import { getCategories } from '../services'
import Link from 'next/link'

const Header = () => {
  const [Categories, setcategories] = useState([])

  useEffect(() => {
    getCategories().then(
      (res) => setcategories(res))
  }, [])

  return (
    <div className='container mx-auto px-10 mb-4 md:mb-8 pb-1 bg-white sm:rounded-bl-3xl sm:rounded-br-3xl'>
      <div className="w-full inline-block pt-8 border-b-2">
        <div className="md:float-left">
          <Link href='/'>
            <div className='cursor-pointer font-bold text-5xl text-gray-800'>
              Wguides
            </div>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {Categories.map((catagories) => (<Link key={catagories.name} href={`/categories/${catagories.slug}`}>
            <span className='md:float-right mt-2 py-1 px-2 align-middle text-gray-800 ml-4 cursor-pointer border-2 border-gray-800 rounded-xl'>
              {catagories.name}
            </span>
          </Link>))}
        </div>

        <Link href='/info'>
          <div className='md:float-right mt-4 mb-2 md:mt-2 md:ml-8 py-1 px-4 align-middle text-gray-800 cursor-pointer border-2 border-gray-800 rounded-xl'>
            Info & Links
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Header
