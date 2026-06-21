'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'
import { PizzaMakerSteps } from './pizzaVars'

export default function Breadcrumb(props) {
  return (
    <>
      <div className='row align-items-center pizza-page-container  '>
        <div className='col pizza-container pizza-full-size d-flex align-items-center'>
          <div className='pizza text-center'>
            <h2>Full Size</h2>
          </div>
        </div>
        <div className='col pizza-container pizza-half-half d-flex align-items-center'>
          <div className='pizza   text-center'>
            <h2>Half-half</h2>
          </div>
        </div>
        <div className='col pizza-container pizza-slices d-flex align-items-center'>
          <div className='pizza  text-center'>
            <h2>Slices</h2>
          </div>
        </div>
      </div>
    </>
  )
}
