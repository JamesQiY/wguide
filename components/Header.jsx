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
    <div className='container mx-auto px-10 mb-8'>
      <div className="w-full incline-block py-8">
        <div className="md:float-left block m-2">
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-white'>
              Wguides
            </span>
          </Link>
        </div>
        <div className='hideen md:float-left md:contents'>
          {Categories.map((catagories)=> (<Link key={catagories.name} href={`/categories/${catagories.slug}`}>
            <span className='md:float-right mt-4 py-1 px-2 align-middle text-white ml-4 cursor-pointer border-2 rounded-xl'> 
              {catagories.name}
            </span>
          </Link>))}
        </div>
      </div>
    </div>
  )
}

export default Header
