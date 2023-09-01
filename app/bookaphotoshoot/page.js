import React from 'react'
import Navigation from '@/components/navigation'
import Booking from '@/components/booking'
import Chatbot from '@/components/chatbot'
let appSetting = require('/appSetting.json')
let appData = require('/data.json')

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: 'Book a photoshoot - Lenggiauit Photography',
    description: 'Book a photoshoot',
    openGraph: {
      images: '',
      title: '',
      description: '',
      url: appSetting.baseUrl + '/book',
      icon: '/favicon.ico',
    },
  }
}

const BookingPage = () => {
  return (
    <>
      <Navigation black></Navigation>
      <main id='bt-main' className='bt-main bt-sectionspace bt-haslayout'>
        <Booking />
      </main>
      {/* <Chatbot /> */}
    </>
  )
}

export default BookingPage
