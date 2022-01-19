import React from "react";
import Map from "../components/Map";
import fetchData from "../services/fetchRankedInfo";

// data is a list of object that contains map info
const ranked = ({ data }) => {
  return (
    <div className="container mx-auto px-4 mb-8">
      <title>Wguides</title>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 col-span-1">
          <div
            className="map_container
          bg-white shadow-lg rounded-3xl mb-8 p-0 sm:p-4 sm:px-2"
          >
            <div className='text-center p-2'>
              <div className=' text-3xl font-bold m-2 p-2'>
                Current Ranked Map Pool
              </div>
              <span className='m-2'>Check discord for more information (will update this page in the future)</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 row-auto gap-2 gap-y-3 place-content-evenly">
              {data.map((row, index) => {
                return <Map data={row} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ranked;

export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    revalidate: 3600,
  };
}
