import React, { useState, useEffect } from 'react'
import { BsFillSignpostFill } from 'react-icons/bs'
import Link from 'next/link'

import { getRecentPosts } from '../../services'

const PostWidget = () => {
  const [recentPost, setrecentPost] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentPosts()
      setrecentPost(data)
    }
    fetchData();
  }, []);

  return (
    <div className='widget'>
      <span className='text-center'>Most Recent Posts</span>
      {recentPost.map((post, index) => (
        <Link href={`/posts/${post.slug}`} key={index}>
          <div className='flex flex-row item-center w-full 
            mb-2 px-2 cursor-pointer rounded-lg bg-red-400 transition duration-500 hover:bg-red-500 shadow-md'>
            <div className='block my-auto mx-0 h-6 w-6 flex-0 text-white'><BsFillSignpostFill size='25px' /></div>
            <div className='m-2 overflow-hidden'>
              <span className='block my-auto p-auto w-full'>{post.title}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
