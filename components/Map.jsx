import React from "react";

// data is an object of map info
// id	name	author	code	image_url	notes	version	footer
const Map = ({ data }) => {
  return (
    <div
      className="col-span-1 mx-1 p-4 min-h-full flex flex-col items-center justify-center
        rounded-3xl bg-neut shadow-inner"
    >
      <div className="m-2 p-2 rounded-lg bg-gray-900 text-white font-bold text-center text-xl">
        {" "}
        {data.name}
      </div>
      <span className="m-1">
        {data.code} | version:{data.version}
      </span>
      <div className=''>{data.author}</div>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={data.image_url}
        className=" my-auto mx-2"
      >
        <img src={data.image_url} className="cover lg:hover:scale-150 transition duration-300" />
      </a>
      <p className="m-2">
        {data.notes} {data.footer}
      </p>
    </div>
  );
};

export default Map;
