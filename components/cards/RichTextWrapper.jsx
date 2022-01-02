import React from 'react'
import { RichText } from '@graphcms/rich-text-react-renderer';

const RichTextWrapper = ({content}) => {
  return (
    <RichText content={content}
      renderers={{
        h1: ({ children }) => <h1 className='text-3xl font-bold my-2'>{children}</h1>,
        h2: ({ children }) => <h2 className='text-2xl font-bold my-2'>{children}</h2>,
        h3: ({ children }) => <h3 className='text-xl font-bold my-2'>{children}</h3>,
        h4: ({ children }) => <h4 className='text-lg font-bold my-2'>{children}</h4>,
        h5: ({ children }) => <h5 className='text-md font-bold my-2'>{children}</h5>,
        h6: ({ children }) => <h6 className='text-md font-bold my-2'>{children}</h6>,
        bold: ({ children }) => <strong>{children}</strong>,
        ul: ({ children }) => <ul className='list-disc list-inside'>{children}</ul>,
        ol: ({ children }) => <ol className='list-disc list-inside'>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        table: ({ children }) => <div className='overflow-scroll'><table className='my-2 border-2 '>{children}</table></div>,
        table_cell: ({ children }) => <td className='p-1 border-2'>{children}</td>,
      }} />
  )
}

export default RichTextWrapper
