import React from 'react'
import Navigation from '@/components/navigation'
import ConceptList from '@/components/conceptList'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'

let appSetting = require('/appSetting.json')
let appData = require('/data/concepts.json')
var conceptsData = appData.find((x) => x.pageUrl == '/concepts')

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: conceptsData.metaData.title,
    description: conceptsData.metaData.description,
    openGraph: {
      images: appSetting.baseUrl + '/images/photos/all_albums.jpg',
      title: conceptsData.metaData.title,
      description: conceptsData.metaData.description,
      url: appSetting.baseUrl + '/concepts',
      icon: '/favicon.ico',
    },
  }
}

const ConceptsPage = () => {
  return (
    <>
      <Navigation black></Navigation>
      <ConceptList data={conceptsData} />
      <Footer />
      {/* <Chatbot /> */}
    </>
  )
}

export default ConceptsPage
