import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CategoriesWidget, PostWidget, PostCard, SearchBox} from '../../components';
import { GetCategoriesPosts } from '../../services';

const CategoriesListed = () => {
  // post related
  const [posts, setposts] = useState([])
  const router = useRouter();

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await GetCategoriesPosts(slug)
      setposts(data)
    }
    fetchData();
  }, [slug]);

  // search related
  const [search, setsearch] = useState('')
  const handleChange = (e) => {
    setsearch(e.target.value)
  }
  let filteredPosts = posts.filter(post => (
    post.node.title.toLowerCase().includes(search.toLowerCase())
  ))

  // sort
  const [sortState, setsortState] = useState(true)
  const handleSort = () => {
      setposts(posts.reverse())
      setsortState(!sortState)
  } 

  return (
    <>
      <div className="container mx-auto px-4 mb-8">
        <title>Wguides</title>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-10">
            {filteredPosts.map((post, index) => <PostCard post={post.node} key={index} />)}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <button onClick={handleSort} className='widget rounded-lg p-4 mt-0'> 
                {sortState? 'sort acending' : 'sort decending'}
              </button>
              <SearchBox placeholder='search' handleChange={handleChange} />
              <PostWidget />
              <CategoriesWidget />
            </div>
          </div>
        </div>
      </div>
    </>
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