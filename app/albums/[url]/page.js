import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Chatbot from '@/components/chatbot'
import PhotoList from '@/components/photoList'
import BtnBooking from '@/components/btnBooking'

let appSetting = require('/appSetting.json')
let appData = require('/data/albums.json')

export async function generateMetadata({ params, searchParams }, parent) {
  const pageData = appData.find((x) => x.pageUrl == params.url)
  if (pageData)
    return {
      title: pageData.metaData.title,
      description: pageData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: appSetting.baseUrl + pageData.photos[0].src,
        title: pageData.metaData.title,
        description: pageData.metaData.description,
        url: appSetting.baseUrl + '/albums/' + params.url,
      },
    }
  else {
    return null
  }
}

const AlbumDetail = ({ params }) => {
  const pageData = appData.find((x) => x.pageUrl == params.url)

  if (pageData) {
    return (
      <>
        <Navigation black></Navigation>
        <main id='bt-main' className='bt-main bt-haslayout bt-portfolio'>
          <div className='bt-freephotosgallery'>
            <h1 className='heading text-center'>
              {pageData.metaData.description}
            </h1>
            <BtnBooking />
            <p className='text-center'>{pageData.metaData.location} </p>

            <PhotoList photos={pageData.photos} />
          </div>
          <div className='clearfix'></div>

          <div className='container'>
            <ul className='bt-postnav'>
              {pageData.prevPage == undefined && <li></li>}
              {pageData.prevPage != undefined && (
                <li>
                  <h3>
                    <a href={pageData.prevPage.link}>
                      {pageData.prevPage.title}
                    </a>
                  </h3>
                  <a href={pageData.prevPage.link}>
                    <i className='icon-arrow-left22'></i>
                    <span>Previous album</span>
                  </a>
                </li>
              )}
              {pageData.nextPage == undefined && <li></li>}
              {pageData.nextPage != undefined && (
                <li>
                  <h3>
                    <a href={pageData.nextPage.link}>
                      {pageData.nextPage.title}
                    </a>
                  </h3>
                  <a href={pageData.nextPage.link}>
                    <span>Next Album</span>
                    <i className='icon-arrow-right22'></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </main>
        <Footer />
        {/* <Chatbot /> */}
      </>
    )
  } else {
    return <></>
  }
}

export default AlbumDetail
