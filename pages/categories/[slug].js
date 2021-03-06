import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { SideWidgets, PostCard, SearchBox } from "../../components";
import { GetCategoriesPosts } from "../../services";
import Container from "../../components/Container";

const CategoriesListed = () => {
  // post related
  const [posts, setposts] = useState([]);
  const router = useRouter();

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await GetCategoriesPosts(slug);
      setposts(data);
    };
    fetchData();
  }, [slug]);

  // search related
  const [search, setsearch] = useState("");
  const handleChange = (e) => {
    setsearch(e.target.value);
  };
  let filteredPosts = posts.filter((post) =>
    post.node.title.toLowerCase().includes(search.toLowerCase())
  );

  // sort
  const [sortState, setsortState] = useState(true);
  const handleSort = () => {
    setposts(posts.reverse());
    setsortState(!sortState);
  };

  return (
    <Container>
      <div className="col-span-1 lg:col-span-8">
        {filteredPosts.map((post, index) => (
          <PostCard post={post.node} key={index} />
        ))}
      </div>
      <SideWidgets>
        <button onClick={handleSort} className="widget rounded-lg p-4 mt-0">
          {sortState ? "sort acending" : "sort decending"}
        </button>
        <SearchBox placeholder="search" handleChange={handleChange} />
      </SideWidgets>
    </Container>
  );
};
export default CategoriesListed;

// // Fetch data at build time
// export async function getStaticProps({ params }) {
//   const data = await GetCategoriesPosts(params.slug);
//   console.log(data)
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }

// // Specify dynamic routes to pre-render pages based on data.
// // The HTML is generated at build time and will be reused on each request.
// export async function getStaticPaths() {
//   const cate = await getCategories();
//   return {
//     paths: cate.map(({name, slug}) => ({ params: { slug } })),
//     fallback: true,
//   };
// }
