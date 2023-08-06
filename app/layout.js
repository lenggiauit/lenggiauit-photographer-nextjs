import Script from 'next/script'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/font-awesome.min.css'
import '../public/css/style.css'

export const metadata = {
  title: 'Lenggiauit - Photographer Portfolio',
  description: 'Lenggiauit - Photographer Portfolio',
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
        <Script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW'
          crossOrigin='anonymous'
        />
        <Script
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-3YWSY2422R'
        ></Script>
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3YWSY2422R', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </body>
    </html>
  )
}
