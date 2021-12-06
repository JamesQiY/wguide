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
    <div className='container mx-auto px-10 mb-4 md:mb-8 pb-1'>
      <div className="w-full inline-block pt-8 border-b-2">
        <div className="md:float-left block m-2">
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-white'>
              Wguides
            </span>
          </Link>
        </div>
        <Link href='/info'>
          <span className='float-left m-2 md:ml-8 py-1 px-4 align-middle text-white cursor-pointer border-2 rounded-xl bg-green-400'>
            Info
          </span>
        </Link>

        <div className='hidden md:float-left md:contents'>
          {Categories.map((catagories) => (<Link key={catagories.name} href={`/categories/${catagories.slug}`}>
            <span className='md:float-right mt-2 py-1 px-2 align-middle text-white ml-4 cursor-pointer border-2 rounded-xl'>
              {catagories.name}
            </span>
          </Link>))}
        </div>
      </div>
    </div>
  )
}

export default Header
