import React from 'react'
import { Header, Footer } from './'
import Head from 'next/head'
import TopButton from './TopButton'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Wguides</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://wargroove.com/wp-content/uploads/2018/11/Vector_Logo.png" />
        <meta property="og:description" content="Online Collection of Wargroove Guides" />
        <meta property="og:url" content="https://wguide.vercel.app/" />
        <meta property="og:title" content="Wguides - Wargroove Guides" />
      </Head>
      <Header />
      {children}
      <TopButton/>
      <Footer />
    </>
  )
}

export default Layout
