import React from 'react'
import { RichText } from '@graphcms/rich-text-react-renderer';

import moment from 'moment';

const PostDetailed = ({ post }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 mb-8'>
      <h1 className="mb-8 text-3xl font-semibold p-4">{post.title}</h1>
      <div className='relative overflow-hidden mb-8 shadow-md rounded-lg'>
        <img
          src={post.featuredImage?.url}
          alt={post.title}
          className='object-top abosolute h-auto w-full object-cover shadow-lg rounded-lg lg:rounded-lg'
        />
      </div>
      <div className='flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center my-auto lg:mb-0 w-auto bg-pink-400 rounded-3xl '>
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
        <RichText content={post.content ? post.content.raw : {children:[]}}
          renderers={{
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2 className='text-2xl font-bold my-2'>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            h5: ({ children }) => <h5>{children}</h5>,
            h6: ({ children }) => <h6 className='text-lg font-bold my-2'>{children}</h6>,
            bold: ({ children }) => <strong>{children}</strong>,
            ul: ({ children }) => <ul className='list-disc list-inside'>{children}</ul>,
            ol: ({ children }) => <ol className='list-disc list-inside'>{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            table: ({ children }) => <div className='overflow-scroll'><table className='my-2 border-2 '>{children}</table></div>,
            table_cell: ({ children }) => <td className='p-1 border-2'>{children}</td>,
          }} />
      </div>
    </div>
  )
}

export default PostDetailed
