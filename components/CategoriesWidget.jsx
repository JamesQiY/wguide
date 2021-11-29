import React, { useState, useEffect } from 'react'
import { FaBook } from 'react-icons/fa'
import Link from 'next/link'

import { getCategories } from '../services'

const CategoriesWidget = () => {
  const [Categories, setcategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories()
      setcategories(data)
    }
    fetchData();
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg px-4 pt-4 pb-2 m-8'>
      <span className='text-center'>Categories</span>
      {Categories.map((Cate) => (
        <Link href={`/categories/${Cate.slug}`} key={Cate.name}>
          <div className='flex flex-row item-center w-full 
            mb-2 px-2 cursor-pointer rounded-lg bg-blue-400 shadow-md'>
              <FaBook size='2rem' className='block my-auto mx-0 h-4 w-4 text-white'/>
            <div className='m-2'>
              <span>{Cate.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoriesWidget