import Navigation from '@/components/navigation'
import HomeAlbums from '@/components/homeAlbums'
import Chatbot from '@/components/chatbot'
let appData = require('/data.json')
let appSetting = require('/appSetting.json')

var homeData = appData.find((x) => x.pageUrl == '/')

export async function generateMetadata({ params, searchParams }, parent) {
  if (homeData)
    return {
      title: homeData.metaData.title,
      description: homeData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: appSetting.baseUrl + homeData.sliderData[0].src,
        title: homeData.metaData.title,
        description: homeData.metaData.description,
        url: appSetting.baseUrl,
      },
    }
  else {
    return null
  }
}
export default function Home() {
  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout'>
        <Navigation></Navigation>
        <HomeAlbums data={appData.find((x) => x.pageUrl == '/')}></HomeAlbums>
      </div>
      <Chatbot />
    </>
  )
}
