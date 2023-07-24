'use client'
import React from 'react'
import Image from 'next/image'
import { v4 } from 'uuid'
import { useEffect } from 'react'

let appSetting = require('/appSetting.json')

function AlbumList(props) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return (
    <>
      <div className='bt-innerpagebanner bt-innerpagebannerv2 bt-fullheight'>
        <figure
          className='bt-fullheight'
          style={{
            backgroundImage: `url('/images/photos/all_albums.jpg')`,
            backgroundPositionX: 'center',
            backgroundPositionY: 'bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <figcaption>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                  <div className='bt-innerbannercontent'>
                    <h1>Album list</h1>
                  </div>
                </div>
              </div>
            </div>
          </figcaption>
          <a
            id='bt-btnscrollto'
            className='bt-btnscrollto bt-btnscroll'
            href='#bt-main'
          >
            scroll
          </a>
        </figure>
      </div>
      <main id='bt-main' className='bt-main bt-haslayout main-content-layout'>
        <div className='container-fluid photos'>
          <div className='row align-items-stretch'>
            {props.data.map((item) => (
              <div key={v4()} className='col-4 col-md-4 bt-album'>
                <a className='d-block photo-item' href={item.link}>
                  <Image
                    width={632}
                    height={421}
                    blurDataURL={rgbDataURL(237, 181, 6)}
                    src={item.src}
                    alt={item.title}
                    className='img-fluid'
                  ></Image>
                  <div className='photo-text-more'>
                    <div className='photo-text-more'>
                      <h3 className='heading'>{item.title}</h3>
                      <span className='meta'>{item.description}</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default AlbumList
