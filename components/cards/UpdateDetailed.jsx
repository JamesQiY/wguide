import React from 'react'
import moment from 'moment';
import RichTextWrapper from './RichTextWrapper';

const UpdateDetailed = (update) => {
  update = update.update
  return (
    <div className='post-container'>
      <h1 className="mb-8 pt-8 p-4 text-3xl font-semibold text-center">{update.title}</h1>
      <div className='flex flex-col text-center items-center justify-center mb-8 w-full'>
        {update.authors?.map((author, index) => {
          return <div className='flex items-center justify-center my-auto mx-1 lg:mb-0 w-auto bg-blue-400 rounded-3xl ' key={index}>
            <img
              src={author?.photo.url}
              alt={author?.name}
              height='40px'
              width='40px'
              className='align-middle rounded-full border-2 border-red-400 '
            />
            <p className='inline align-middle text-gray-700 mx-4 text-lg break-words'>Author: {author?.name}</p>
          </div>
        })}
        <div className='my-2 mx-4'>{moment(update.createdAt).format('MMM DD, YYYY')}</div>
      </div>
      <div className='m-4 mb-8 p-2 content-container'>
        <RichTextWrapper content={update.content ? update.content.raw : { children: [] }} />
      </div>
    </div>
  )
}

export default UpdateDetailed
