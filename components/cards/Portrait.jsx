import React from "react";

const Portrait = ({ imageSrc, text }) => {
  return (
    <>
      <div className="m-2 p-2 text-center italic text-sm shadow-inner rounded-3xl">
        <img
          src={imageSrc}
          alt={text}
          className="hidden sm:block max-w-350 overflow-y-hidden object-cover max-w-350"
        />
        <p className="m-2">{text}</p>
      </div>
    </>
  );
};

export default Portrait;
