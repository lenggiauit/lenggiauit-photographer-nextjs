import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/font-awesome.min.css'
import '../public/css/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export const metadata = {
  metadataBase: new URL('https://lenggiauit.com'),
  title: 'Lenggiauit - Photographer Portfolio',
  description: 'Lenggiauit - Photographer Portfolio',
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <meta
          httpEquiv='Cross-Origin-Opener-Policy'
          content='unsafe-none'
        ></meta>
      </head>
      <body suppressHydrationWarning={true} className='bt-home'>
        {children}
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
