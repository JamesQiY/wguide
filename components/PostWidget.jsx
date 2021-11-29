import React, { useState, useEffect } from 'react'
import { BsFillSignpostFill } from 'react-icons/bs'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts } from '../services'

const PostWidget = () => {
  const [recentPost, setrecentPost] = useState([])

  useEffect(() => {
    getRecentPosts().then(
      (res) => setrecentPost(res)
    )
  }, [])
  return (
    <div className='bg-white shadow-lg rounded-lg px-4 pt-4 pb-2 m-8'>
      {recentPost.map((post, index) => (
        <Link href={`/posts/${post.slug}`} key={index}>
          <div className='flex flex-row item-center w-full 
            mb-2 px-2 cursor-pointer rounded-lg bg-green-300 shadow-md'>
            <div className='block my-auto mx-0 h-6 w-6 flex-0 text-white'><BsFillSignpostFill size='25px' /></div>
            <div className='m-2 overflow-hidden'>
              <p className='py-1 px-2 rounded-lg bg-white text-gray-800'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <span className='my-auto p-auto w-full'>{post.title}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
