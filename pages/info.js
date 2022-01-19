import React, { useState } from "react";
import { getLinks } from "../services";
import SearchBox from "../components/widgets/SearchBox";

const info = ({ links }) => {
  const [search, setsearch] = useState("");

  const handleChange = (e) => {
    setsearch(e.target.value);
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 mb-8">
      <title>Wguides</title>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 col-span-1">
          <div className="post-container">
            <div className="text-xl m-4 p-4 text-center font-bold">
              Information and links
            </div>
            <p className="mb-4 p-1 text-center">
              This site is a collection of Wargroove related guides in a blog
              style. Made by jams. If you have any questions or suggestions, you
              can find me in the official wargroove discord.
            </p>
            <SearchBox
              placeholder={"Link Search"}
              handleChange={handleChange}
            />
            <div className="relative overflow-hidden shadow-md rounded-lg m-1 p-4 pb-8">
              Links
              {filteredLinks.map((link, index) => (
                <div key={index} className="p-2">
                  <a
                    href={link.address}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="inline-block">
                      <div className="text-blue-600"> {link.title} </div>
                      <div className="p-0 pl-2 mt-1 text-sm block">
                        {link.description}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default info;

export async function getStaticProps() {
  const links = (await getLinks()) || [];
  return {
    props: { links },
    revalidate: 60,
  };
}
