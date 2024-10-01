'use client'
import Image from 'next/image'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { v4 } from 'uuid'
import 'keen-slider/keen-slider.min.css'
import PageLoader from '@/components/pageLoader'

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add('active')
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on('created', () => {
      if (!mainRef.current) return

      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
      mainRef.current.on('slideChanged', (main) => {})
    })
  }
}
export default function HomeAlbums(props) {
  var audioRef = useRef()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      renderMode: 'performance',
      loop: true,
      initial: 0,
      slideChanged: (s) => {
        //  setCurrentSlide(s.track.details.rel)
        // console.log(s.track.details.rel)
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2500)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ]
  )

  const [thumbnailRef] = useKeenSlider(
    {
      renderMode: 'performance',
      loop: true,

      initial: 0,
      vertical: true,
      slides: {
        origin: 'center',
        perView: 6,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  useEffect(() => {
    setIsLoading(false)
    var main = document.getElementById('bt-main')
    if (main != null) {
      main.click()
    }
  }, [])

  const playBackground = () => {
    const audio = audioRef.current
    if (typeof window !== 'undefined') {
      if (!isPlaying) {
        setIsPlaying(true)
        audio?.play()
      }
    }
  }

  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          <main
            id='bt-main'
            onClick={playBackground}
            className='bt-main bt-haslayout h-100 overflow-hidden position-relative'
          >
            <audio ref={audioRef} id='background_audio' loop>
              <source src='/music/OneStepCloser.mp3' type='audio/mpeg' />
            </audio>
            <div
              ref={sliderRef}
              id='tg-postfullslider'
              className='tg-postfullslider keen-slider'
            >
              {props.data.sliderData
                .filter((item) => {
                  return item.visible == true
                })
                .map((item, index) => (
                  <div
                    key={v4()}
                    className='bt-item keen-slider__slide lazy__slide'
                    rel={index}
                  >
                    <figure
                      style={{
                        backgroundImage: `url('${item.src}')`,
                        backgroundPositionX: 'center',
                        backgroundPositionY: `${item.alignment}`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      <div className='bt-slidercontent'>
                        <h1
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h1>
                        <div className='bt-description'>
                          <p>{item.description}</p>
                        </div>
                        <div className='bt-btnbox'>
                          <a className='bt-btn' href={item.link}>
                            <span>view photos</span>
                          </a>
                        </div>
                      </div>
                    </figure>
                  </div>
                ))}
            </div>
            <a
              id='bt-togglethumbnails'
              className='bt-togglethumbnails'
              role='button'
            >
              thumbs
            </a>
            <div
              ref={thumbnailRef}
              id='tg-postthumbnail'
              className='keen-slider tg-postthumbnail  thumbnail'
            >
              {props.data.sliderData
                .filter((item) => {
                  return item.visible == true
                })
                .map((item) => (
                  <div
                    key={v4()}
                    className='bt-item keen-slider__slide lazy__slide'
                  >
                    <figure>
                      <Image
                        className='bt-item-thumbnail'
                        width={200}
                        height={133}
                        src={item.thumb}
                        alt='thumbnail'
                      />
                    </figure>
                  </div>
                ))}
            </div>
            <div className='tg-bannerfullwidthslidecount'>
              <span>
                {instanceRef.current != null
                  ? instanceRef.current.track.details.rel
                  : '0'}
              </span>
              <span>
                {
                  props.data.sliderData.filter((item) => {
                    return item.visible == true
                  }).length
                }
              </span>
            </div>
          </main>
        </>
      )}
    </>
  )
}
