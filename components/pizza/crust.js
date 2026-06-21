'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'
import { PizzaSize } from './pizzaVars'

export default function Crust(props) {
  return (
    <>
      <div className='row align-items-center pizza-page-container'>
        {Object.keys(PizzaSize).map((key) => (
          <div
            key={key}
            className={
              'col pizza-crust-container pizza-full-size d-flex align-items-center pizza-' +
              key.toLowerCase()
            }
          >
            <div className='pizza text-center'>
              <h2>{PizzaSize[key]}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
