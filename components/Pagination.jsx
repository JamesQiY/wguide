import React from 'react';

const Pagination = ({currPage, setcurrPage, numPages}) => {

  const nextPage = () => {
    if (currPage < numPages)
      setcurrPage(currPage + 1);
  
  };
  
  const prevPage = () => {
    if (currPage > 1)
      setcurrPage(currPage - 1);
  };
  
  
  const handlePageChange = (pageNum) => {
    setcurrPage(pageNum)
  }
  
  const paginationPages = () => {
    let pages = [];
  
    const current = (pageNum) => {
      if (pageNum === currPage) {
        return "bg-gray-300";
      } else {
        return "";
      }
    };
  
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            "m-1 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-blue-300 hover:opacity-60 caret-transparent cursor-pointer " +
            current(i)
          }>
          {i}
        </button>
      );
    }
    return pages;
  };
  return(
    <div className="pagination flex items-center justify-center">
    <button
      onClick={prevPage}
      className="h-10 m-1 px-2 text-center rounded-xl bg-gray-400 shadow-inner hover:bg-gray-500">
      {"prev"}
    </button>

    {paginationPages()}

    <button
      onClick={nextPage}
      className="h-10 m-1 px-2 text-center rounded-xl bg-gray-400 shadow-inner hover:bg-gray-500">
      {"next"}
    </button>
  </div>
  )
}
export default Pagination;
