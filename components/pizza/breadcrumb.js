'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'
import { PizzaMakerSteps } from './pizzaVars'

export default function Breadcrumb(props) {
  return (
    <>
      <div className='pizza-steps-container container text-center'>
        <div className='row '>
          <div className='col-md-12'>
            <nav className='pizza-steps'>
              <ul id='breadcrumb'>
                {Object.keys(PizzaMakerSteps).map((key) => (
                  <li key={key}>
                    <a href='#' className={key}>
                      {PizzaMakerSteps[key]}
                    </a>
                  </li>
                ))}
                <li>
                  <a href='#'>Order</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
