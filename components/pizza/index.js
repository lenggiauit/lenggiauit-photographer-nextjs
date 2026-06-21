'use client'
import { useEffect, useState } from 'react'
import PageLoader from '../pageLoader'
import { v4 } from 'uuid'
import dateFormat from 'dateformat'
import { PizzaMakerSteps } from './pizzaVars'
import Breadcrumb from '@/components/pizza/breadcrumb'
import PizzaType from '@/components/pizza/pizzaType'
import Crust from '@/components/pizza/crust'

export default function Index(props) {
  const localStorageKey = 'pizzaMakerResult'
  let localPizzaMakerResult = {}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localPizzaMakerResult = window.localStorage.getItem(localStorageKey)
    }
  }, [])
  const [pizzaMakerStep, setPizzaMakerStep] = useState(PizzaMakerSteps.Type)
  const [pizzaMakerDetail, setPizzaMakerDetail] = useState({})

  return (
    <>
      <div className='pizza-page-container-bg container'>
        <Breadcrumb />
        {/* <PizzaType /> */}
        <Crust />
      </div>
    </>
  )
}
