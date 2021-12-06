import React from 'react';

const SearchBox = ({ placeholder, handleChange }) => {
  return (
    <span className='block px-8'>
      <input type='search'
        className='rounded-xl w-full px-4 pt-4 pb-2 mr-8 dark:text-white text-black
         dark:bg-truegray-700 bg-gray-100 shadow-inner hover:ring-blue-400'
        placeholder={placeholder}
        onChange={handleChange}
      />
    </span>

  )
}

export default SearchBox;