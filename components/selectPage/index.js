'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { db } from '@/app/firebase'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'

export default function SelectPage(props) {
  const localStorageKey = 'showSelectPage'
  var showSelectPage = 'false'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      showSelectPage = window.localStorage.getItem(localStorageKey)
    }
  }, [])
  if (showSelectPage != 'false') {
    return (
      <>
        <div className='s-page-container-bg show'>
          <div className='s-page-container'>
            {/* <a className='btn s-page-btn-close' href='#'>
            <i class='bi bi-x-circle'></i>
          </a> */}
            <div class='s-page-shape top'>
              <a
                className='s-page-bt-btn'
                href='/'
                title='Home page'
                style={{ lineHeight: 1.2 }}
              >
                <i class='bi bi-house' style={{ fontSize: 175 }}></i>
              </a>
            </div>
            <div class='s-page-shape bottom'>
              <a
                className='s-page-bt-btn'
                href='/bookaphotoshoot'
                title='Book a photoshoot'
              >
                <i class='bi bi-camera2' style={{ fontSize: 175 }}></i>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}
