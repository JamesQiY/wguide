import React from "react";
import Link from "next/link";

const AdjacentPost = ({ data }) => {
  return (
    <div>
      <RelatedPost data={data.next} text={"Next Post"} />
      <RelatedPost data={data.prev} text={"Previous Post"} />
    </div>
  );
};

const RelatedPost = ({ data, text }) => {
  if (typeof data === "undefined") {
    return <></>;
  }
  return (
    <Link href={`/posts/${data.slug}`}>
      <div className="my-2 p-2 px-4 flex rounded-xl bg-white shadow-inner cursor-pointer">
        <div className="flex flex-col justify-center">
          <p className="my-2">{text}</p>
          <div className="font-bold">{data.title}</div>
        </div>

        <div className="ml-auto mr-2">
          <img
            src={data.featuredImage.url}
            alt={data.title}
            className={" hidden sm:block m-2 h-40 rounded-xl"}
          />
        </div>
      </div>
    </Link>
  );
};

export default AdjacentPost;
