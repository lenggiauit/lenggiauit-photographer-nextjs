import Script from 'next/script'
import Head from 'next/head'
import '../public/css/bootstrap.min.css'
import '../public/css/normalize.css'
import '../public/css/icomoon.css'
import '../public/css/font-awesome.min.css'
import '../public/css/cubeportfolio.css'
import '../public/css/jgallery.min.css'
import '../public/css/pogoslider.css'
import '../public/css/prettyPhoto.css'
import '../public/css/slick-theme.css'
import '../public/css/slick.css'
import '../public/css/transitions.css'
import '../public/css/style.css'
import '../public/css/color.css'
import '../public/css/responsive.css'
import Link from 'next/link'

export const metadata = {
  title: 'lenggiauit - Photographer Portfolio',
  description: 'lenggiauit - Photographer Portfolio',
  'og:title': 'European Travel Destinations',
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        {/* <script src='/js/vendor/jquery-library.js'></script> */}
      </head>

      <body className='bt-home'>{children}</body>
      <Script src='/js/vendor/jquery-library.js' async></Script>
      <Script
        src='/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js'
        async
      ></Script>
      <Script src='/js/vendor/bootstrap.min.js' async></Script>
      <Script src='/js/jquery.cubeportfolio.min.js' async></Script>
      <Script src='/js/tinycolor-0.9.16.min.js' async></Script>
      <Script src='/js/jquery.scrollTo.min.js' async></Script>
      <Script src='/js/jquery.pogoslider.js' async></Script>
      <Script src='/js/touchswipe.min.js' async></Script>
      <Script src='/js/jgallery.js' async></Script>
      <Script src='/js/jquery.vide.js' async></Script>
      <Script src='/js/prettyPhoto.js' async></Script>
      <Script src='/js/slick.min.js' async></Script>
      <Script src='/js/parallax.js' async></Script>
      <Script src='/js/countTo.js' async></Script>
      <Script src='/js/appear.js' async></Script>
      <Script src='/js/themefunction.js' async></Script>
    </html>
  )
}
