import { PostCard, SearchBox, SideWidgets } from '../components'
import { getPosts } from '../services'
import React, { useState, useCallback, useEffect } from 'react'

export default function Home({ posts }) {
  const [search, setsearch] = useState('')

  const handleChange = (e) => {
    setsearch(e.target.value)
  }

  const filteredPosts = posts.filter(post => (
    post.node.title.toLowerCase().includes(search.toLowerCase())
  ))
  
  let breakpoint = useMediaQuery(640)

  return (
    <div className="container sm:mx-auto px-4 mb-8">
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        {breakpoint ? <SearchBox placeholder='search' handleChange={handleChange} /> : <></> }
        <div className='col-span-1 lg:col-span-8'>
          {filteredPosts.map((post, index) => <PostCard post={post.node} key={index} />)}
        </div>
        <SideWidgets> 
          {!breakpoint ? <SearchBox placeholder='search' handleChange={handleChange} /> : <></> }
        </SideWidgets>
      </div>
    </div>
  )
}

// https://github.com/vercel/next.js/discussions/14810
const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};


export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
    revalidate: 60
  }
}
