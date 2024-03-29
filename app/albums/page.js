import React from 'react'
import Navigation from '@/components/navigation'
import AlbumList from '@/components/albumList'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'

let appSetting = require('/appSetting.json')
let appData = require('/data/albums.json')
var albumsData = appData.find((x) => x.pageUrl == '/albums')

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: albumsData.metaData.title,
    description: albumsData.metaData.description,
    openGraph: {
      images: appSetting.baseUrl + '/images/photos/all_albums.jpg',
      title: albumsData.metaData.title,
      description: albumsData.metaData.description,
      url: appSetting.baseUrl + '/albums',
      icon: '/favicon.ico',
    },
  }
}

const AlbumPage = () => {
  return (
    <>
      <Navigation></Navigation>
      <AlbumList data={albumsData.albums} />
      <Footer />
      {/* <Chatbot /> */}
    </>
  )
}

export default AlbumPage
