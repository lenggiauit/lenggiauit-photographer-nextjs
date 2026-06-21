import '../../public/css/pizzamaker.css'
import PizzaPage from '@/components/pizza'
let appSetting = require('/appSetting.json')
let appData = require('/data/pizzamaker/pages.json')
const pageData = appData.find((x) => x.pageUrl == '/pizzamaker')

export async function generateMetadata({ params, searchParams }, parent) {
  if (pageData) {
    return {
      title: pageData.metaData.title,
      description: pageData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: '',
        title: pageData.metaData.title,
        description: pageData.metaData.description,
        url: appSetting.baseUrl + '/pizzamaker',
      },
    }
  } else {
    return null
  }
}
export default function Pizzamaker() {
  return (
    <>
      <PizzaPage />
    </>
  )
}
