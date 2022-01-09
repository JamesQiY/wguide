import React from 'react'
import moment from 'moment';
import RichTextWrapper from './RichTextWrapper';

const PostDetailed = ({ post }) => {
  return (
    <div className='post-container fade-in'>
      <h1 className="mb-8 text-3xl font-semibold p-4">{post.title}</h1>
      <div className='relative overflow-hidden mb-8 shadow-md'>
        <img
          src={post.featuredImage?.url}
          alt={post.title}
          className='rounded-lg h-auto max-h-80 w-full object-cover lg:rounded-lg'
        />
      </div>
      <div className='flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center my-auto lg:mb-0 w-auto bg-blue-400 rounded-3xl '>
          <img
            src={post.author?.photo.url}
            alt={post.author?.name}
            height='40px'
            width='40px'
            className='align-middle rounded-full border-2 border-red-400'
          />
          <p className='inline align-middle text-gray-700 mx-4 text-lg break-words'>Author: {post.author?.name}</p>
        </div>
        <span className='my-auto mx-4 inline '>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>
      <div className='m-4 mb-8 p-2 content-container'>
        <RichTextWrapper content={post.content ? post.content.raw : { children: [] }}/>
      </div>
    </div>
  )
}

export default PostDetailed
