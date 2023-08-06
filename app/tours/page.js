import React from 'react'
import Navigation from '@/components/navigation'
import AlbumList from '@/components/albumList'
import Footer from '@/components/footer'
import Head from 'next/head'

let appSetting = require('/appSetting.json')
let appData = require('/data.json')

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'Lenggiauit - Photography Tours',
    description:
      'I have many tours for you to enjoy traveling around Canada and take lots of pictures for you at that time.',
    openGraph: {
      images: '',
      title: '',
      description: '',
      url: appSetting.baseUrl + '/tours',
      icon: '/favicon.ico',
    },
  }
}

const PhotoTourPage = () => {
  return (
    <>
      <Navigation black></Navigation>
      <main id='bt-main' className='bt-main bt-haslayout bt-portfolio'></main>
      <Footer />
    </>
  )
}

export default PhotoTourPage
