import React, { useState } from "react";
import Container from "../components/Container";
import { SearchBox } from "../components";
import MapCard from "../components/MapCard";
import { fetchMapList } from "../services/fetchRankedInfo";

const allmaps = ({ maplist }) => {
  const [search, setsearch] = useState("");
  const handleChange = (e) => {
    setsearch(e.target.value);
  };

  let filteredMaps = maplist.filter(
    (map) =>
      map.name.toLowerCase().includes(search.toLowerCase()) ||
      map.author.toLowerCase().includes(search.toLowerCase()) ||
      map.notes.toLowerCase().includes(search.toLowerCase())
  );

  const updateDate = 'Updated on 2022 Jan'

  return (
    <Container>
      <div className="lg:col-span-12 col-span-1 bg-white shadow-lg rounded-3xl mb-8 p-0 sm:p-4 sm:px-2">
        <div className="p-2 m-1 text-center text-xl font-bold">
          Competitive Map List
        </div>
        <div className='m-1 p-1 text-center'>{updateDate}</div>
        <p className="m-1 p-1 text-sm text-center">
          This is a list of previously made maps with competitive PvP in mind.
          Not a complete list nor will contain most recent updates.
          Quality of maps vary, some maps are displayed as achived.
        </p>
        <div className="m-1 p-2 rounded-2xl bg-blue-300">
          <SearchBox placeholder={"search"} handleChange={handleChange} />
        </div>
        <div className="m-2 grid grid-cols-1 lg:grid-cols-3 row-auto gap-2 gap-y-3 place-content-evenly">
          {filteredMaps.map((row, index) => {
            return <MapCard data={row} key={index} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export default allmaps;

export async function getStaticProps() {
  const maplist = await fetchMapList();

  return {
    props: { maplist },
    revalidate: 3600,
  };
}
