import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Image from 'next/image'
import { v4 } from 'uuid'
import Head from 'next/head'
import PhotoList from '@/components/photoList'

let appSetting = require('/appSetting.json')
let appData = require('/data.json')

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
            <ul id='js-filters-agency' className='cbp-l-filters-text'>
              <li
                data-filter='*'
                className='cbp-filter-item-active cbp-filter-item pe-auto'
              >
                All<div className='cbp-filter-counter'></div>
              </li>
              <li data-filter='.new' className='cbp-filter-item pe-auto'>
                New<div className='cbp-filter-counter'></div>
              </li>
              <li
                data-filter='.most-recent'
                className='cbp-filter-item pe-auto'
              >
                Most recent<div className='cbp-filter-counter'></div>
              </li>
              <li data-filter='.popular' className='cbp-filter-item pe-auto'>
                Popular<div className='cbp-filter-counter'></div>
              </li>
            </ul>

            <PhotoList photos={pageData.photos} />
          </div>
          <div className='clearfix'></div>

          <div className='container'>
            <ul className='bt-postnav'>
              {pageData.prevPage == undefined && <li></li>}
              {pageData.prevPage != undefined && (
                <li>
                  <h3>
                    <a href={appSetting.baseUrl + pageData.prevPage.link}>
                      {pageData.prevPage.title}
                    </a>
                  </h3>
                  <a href={appSetting.baseUrl + pageData.prevPage.link}>
                    <i className='icon-arrow-left22'></i>
                    <span>Previous album</span>
                  </a>
                </li>
              )}
              {pageData.nextPage == undefined && <li></li>}
              {pageData.nextPage != undefined && (
                <li>
                  <h3>
                    <a href={appSetting.baseUrl + pageData.nextPage.link}>
                      {pageData.nextPage.title}
                    </a>
                  </h3>
                  <a href={appSetting.baseUrl + pageData.nextPage.link}>
                    <span>next Album</span>
                    <i className='icon-arrow-right22'></i>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </main>
        <Footer />
      </>
    )
  } else {
    return <></>
  }
}

export default AlbumDetail
