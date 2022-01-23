import React from "react";

// data is an object of map info
// id	name	author	code	image_url	notes	version	footer
const MapCard = ({ data }) => {
  const reFog = /([fF]og)+/;
  const showFog = reFog.test(data.name + " " + data.notes);

  return (
    <div
      className="col-span-1 mx-1 p-4 min-h-full flex flex-col items-center justify-center
        rounded-3xl bg-neut shadow-inner"
    >
      <div className='flex flex-col sm:flex-row items-center'>
        <div className="inline-block m-2 p-2 rounded-lg bg-gray-900 text-white font-bold text-center text-xl">
          {" "}
          {data.name}
        </div>
        {showFog && (
          <span className="m-1 px-4 py-2 text-center rounded-full bg-yellow-300">
            {"Fog"}
          </span>
        )}
      </div>

      <span className="m-1">
        {data.code} | version:{data.version}
      </span>
      <div className="">{data.author}</div>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={data.image_url}
        className=" my-auto mx-2"
      >
        <img
          src={data.image_url}
          className="cover lg:hover:scale-150 transition duration-300"
        />
      </a>
      <p className="m-1 whitespace-pre-line text-center">{data.notes}</p>
      <p className="m-1 whitespace-pre-line">{data.footer}</p>
    </div>
  );
};

export default MapCard;
