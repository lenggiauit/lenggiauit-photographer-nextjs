'use client'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
// import optional lightbox plugins
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import Masonry from '@mui/lab/Masonry'

const PhotoList = ({ photos }) => {
  const [index, setIndex] = useState(-1)
  if (photos) {
    return (
      <>
        <Masonry columns={3} spacing={2}>
          {photos.map((item, index) => (
            <div key={index}>
              <img
                width={632}
                onClick={() => {
                  setIndex(index)
                }}
                src={`${item.src}?w=162&auto=format`}
                srcSet={`${item.src}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading='lazy'
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
              />
            </div>
          ))}
        </Masonry>
        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </>
    )
  } else {
    return <></>
  }
}

export default PhotoList
