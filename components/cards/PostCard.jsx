import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  return (
    <div className='post-container'>
      <div className='relative overflow-hidden shadow-md rounded-lg pb-4'>
        <Link href={`/posts/${post.slug}`}>
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className='object-center h-60 w-full object-cover shadow-inner rounded-lg lg:rounded-lg cursor-pointer'
          />
        </Link>
        <h1 className='transition duration-500 text-center my-4 cursor-pointer hover:text-blue-600 text-3xl font-semibold'>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h1>
        <div className='flex flex-col text-center items-center justify-center w-full'>
          <div className='flex items-center justify-center mb-4 lg:mb-0 w-auto bg-blue-400 rounded-3xl '>
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              height='40px'
              width='40px'
              className='align-middle rounded-full border-2 border-red-400'
            />
            <p className='inline align-middle mx-4 text-lg break-words'>Author: {post.author.name}</p>
          </div>
          <span className='my-1'>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          <span className='m-2 px-4'>{post.excerpt}</span>
        </div>
        <div className='flex items-center justify-center '>
          <Link href={`/posts/${post.slug}`}>
            <span className='my-2 mx-auto px-4 py-2 text-center font-bold text-lg rounded-full cursor-pointer
            text-white bg-blue-400 transition duration-500 hover:bg-blue-600'>Continue</span>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default PostCard
