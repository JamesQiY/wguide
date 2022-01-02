import React, { useState, useEffect } from 'react'
import { GrUpdate } from 'react-icons/gr'
import moment from 'moment'
import Link from 'next/link'

import { getRecentUpdates } from '../../services'

const UpdateWidget = () => {
  const [recentUpdates, setrecentUpdates] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentUpdates()
      setrecentUpdates(data)
    }
    fetchData();
  }, []);

  return (
    <div className='widget'>
      <span className='text-center'>Updates</span>
      {recentUpdates.map((update, index) => (
        <Link href={`/updates/${update.slug}`} key={index}>
          <div className='flex flex-row item-center w-full 
            mb-2 px-2 cursor-pointer rounded-lg bg-red-400 transition duration-500 hover:bg-red-500  shadow-md'>
            <div className='block my-auto mx-1 h-6 w-6 flex-0 text-white'>
              <GrUpdate size='25px' />
            </div>
            <div className='m-2 overflow-hidden'>
              <p className='my-1 py-0.5 px-2 inline-block rounded-lg bg-white text-gray-800'>
                {moment(update.createdAt).format('MMM DD, YYYY')}
              </p>
              <span className='block my-auto p-auto w-full'>
                {update.title}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UpdateWidget
