import Script from 'next/script'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/font-awesome.min.css'
import '../public/css/style.css'
import Link from 'next/link'

export const metadata = {
  title: 'lenggiauit - Photographer Portfolio',
  description: 'lenggiauit - Photographer Portfolio',
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1'
          crossOrigin='anonymous'
        />
      </head>
      <body suppressHydrationWarning={true} className='bt-home'>
        {children}
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW'
          crossOrigin='anonymous'
        />
      </body>
    </html>
  )
}
