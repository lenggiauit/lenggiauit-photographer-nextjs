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
      </head>

      <body className='bt-home'>{children}</body>
      <script src='/js/vendor/jquery-library.js'></script>
      <script src='/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js'></script>
      <script src='/js/vendor/jquery-library.js'></script>
      <script src='/js/vendor/bootstrap.min.js'></script>
      <script src='/js/jquery.cubeportfolio.min.js'></script>
      <script src='/js/tinycolor-0.9.16.min.js'></script>
      <script src='/js/jquery.scrollTo.min.js'></script>
      <script src='/js/jquery.pogoslider.js'></script>
      <script src='/js/touchswipe.min.js'></script>
      <script src='/js/jgallery.js'></script>
      <script src='/js/jquery.vide.js'></script>
      <script src='/js/prettyPhoto.js'></script>
      <script src='/js/slick.min.js'></script>
      <script src='/js/parallax.js'></script>
      <script src='/js/countTo.js'></script>
      <script src='/js/appear.js'></script>
      <script src='/js/themefunction.js'></script>
    </html>
  )
}
