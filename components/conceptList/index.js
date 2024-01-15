'use client'
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import PageLoader from '@/components/pageLoader'
import Image from 'next/image'
import BtnBooking from '@/components/btnBooking'

const ConceptList = (props) => {
  const [index, setIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          <main id='bt-main' className='bt-main bt-haslayout'>
            <div class='container'>
              <div className='row'>
                <div className='bt-freephotosgallery'>
                  <h1 className='heading text-center'>
                    {props.data.pageheader.title}
                  </h1>
                  <BtnBooking />
                  <p className='text-center'>
                    {props.data.pageheader.description}
                  </p>
                </div>
              </div>

              <div className='row mt-4'>
                {props.data.concepts.map((item) => (
                  <div key={v4()} className='col-md-6'>
                    <article className='bt-post '>
                      <figure>
                        <a href={item.link}>
                          <img src={item.src} alt={item.title} />
                        </a>
                      </figure>
                      <div className='bt-postcontent'>
                        <div className='bt-posttitle'>
                          <a href={item.link}>
                            <h3>{item.title}</h3>
                          </a>
                        </div>
                        <div className='bt-description'>
                          <p>{item.description}</p>
                          <p>Location: {item.location}</p>
                          <p>Status: {item.status}</p>
                        </div>
                        <div className=' text-end'>
                          <a className='bt-btn bt-btnblack' href={item.link}>
                            <span>explore</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default ConceptList
