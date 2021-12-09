import Head from 'next/head'
import { PostCard, CategoriesWidget, PostWidget } from '../components'
import { getPosts } from '../services'
import SearchBox from '../components/SearchBox'
import React, { useState } from 'react'

export default function Home({ posts }) {
  const [search, setsearch] = useState('')

  const handleChange = (e) => {
    setsearch(e.target.value)
  }

  const filteredPosts = posts.filter(post => (
    post.node.title.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div className="container mx-auto px-10 mb-8 b-gray-100">
      <Head>
        <title>Wguides</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://wargroove.com/wp-content/uploads/2018/11/Vector_Logo.png" />
        <meta property="og:description" content="Online Collection of Wargroove Guides" />
        <meta property="og:url" content="https://wguide.vercel.app/" />
        <meta property="og:title" content="Wguides - Wargroove Guides" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {filteredPosts.map((post, index) => <PostCard post={post.node} key={index} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <SearchBox placeholder='search' handleChange={handleChange} />
            <PostWidget />
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
    revalidate: 60
  }
}
