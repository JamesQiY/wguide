import React, { useState, useEffect } from "react";
import { BsArrowClockwise } from "react-icons/bs";
import moment from "moment";
import Link from "next/link";

import { getRecentUpdates } from "../../services";

const UpdateWidget = () => {
  const [recentUpdates, setrecentUpdates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentUpdates();
      setrecentUpdates(data);
    };
    fetchData();
  }, []);

  return (
    <div className="widget">
      <span className="text-center">Updates</span>
      {recentUpdates.map((update, index) => (
        <Link href={`/updates/${update.slug}`} key={index}>
          <div
            className="flex flex-row item-center w-full 
            mb-2 px-2 cursor-pointer rounded-lg bg-indigo-400 transition duration-500 hover:bg-indigo-500
            shadow-md"
          >
            <div className="block my-auto mx-1 h-6 w-6 flex-0 text-white">
              <BsArrowClockwise size="25px" />
            </div>
            <div className="m-2 overflow-hidden text-lg">
              <span className="my-1 inline-block ">
                {update.title}
              </span>
              <p className="block my-auto p-auto w-full text-sm">
                {moment(update.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UpdateWidget;
