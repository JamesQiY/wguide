import React from "react";
import Container from "../components/Container";
import Map from "../components/Map";
import fetchData from "../services/fetchRankedInfo";

// data is a list of object that contains map info
const ranked = ({ data }) => {
  return (
    <Container>
      <div className="lg:col-span-12 col-span-1">
        <div
          className="map_container
          bg-white shadow-lg rounded-3xl mb-8 p-0 sm:p-4 sm:px-2"
        >
          <div className="text-center p-2">
            <div className=" text-3xl font-bold m-2 p-2">
              Current Ranked Map Pool
            </div>
            <div className="m-1">Check discord for more information</div>
            <div className="mb-4">(Page is still work in progress)</div>
            <a
              href={"https://discord.gg/wargroove"}
              className="cursor-pointer bg-blue-400 rounded-3xl p-2">
              Discord Invite Link
            </a>
            <div className="m-4 p-2">
              <p className="m-2 p-2 text-center font-bold text-lg">
                Currently Banned Commanders
              </p>
              <p>
                They are banned either for their power level being way stronger
                than other commanders or to encourage more diversity in
                commander usage
              </p>
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center">
                <Portrait imageSrc={"/caesar_portrait.png"} text={"Caesar"} />
                <Portrait imageSrc={"/koji_portrait.png"} text={"Koji"} />
                <Portrait imageSrc={"/ragna_portrait.png"} text={"Ragna"} />
                <Portrait imageSrc={"/ryota_portrait.png"} text={"Ryota"} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 row-auto gap-2 gap-y-3 place-content-evenly">
            {data.map((row, index) => {
              return <Map data={row} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

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

export default ranked;

export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    revalidate: 3600,
  };
}
