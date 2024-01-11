import React from 'react'
import Navigation from '@/components/navigation'
import ConceptDetail from '@/components/conceptDetail'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'

let appSetting = require('/appSetting.json')
let appData = require('/data/concepts.json')

export async function generateMetadata({ params, searchParams }, parent) {
  const pageData = appData.find((x) => x.pageUrl == 'concepts/' + params.url)
  if (pageData)
    return {
      title: pageData.metaData.title,
      description: pageData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: appSetting.baseUrl + pageData.photos[0].src,
        title: pageData.metaData.title,
        description: pageData.metaData.description,
        url: appSetting.baseUrl + '/concepts/' + params.url,
      },
    }
  else {
    return null
  }
}

const ConceptPage = ({ params }) => {
  const pageData = appData.find((x) => x.pageUrl == 'concepts/' + params.url)

  if (pageData) {
    return (
      <>
        <Navigation black></Navigation>
        <ConceptDetail data={pageData} />

        <Footer />
        {/* <Chatbot /> */}
      </>
    )
  } else {
    return <></>
  }
}

export default ConceptPage
