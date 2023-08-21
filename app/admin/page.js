'use client'
import Navigation from '@/components/navigation'
import AdminBookingList from '@/components/adminBookingList'
import { auth, googleProvider } from '../firebase'
import SignIn from '@/components/auth'
import { signInWithPopup, signOut } from 'firebase/auth'

let appSetting = require('/appSetting.json')
let appData = require('/data.json')

var homeData = appData.find((x) => x.pageUrl == '/')

export async function generateMetadata({ params, searchParams }, parent) {
  if (homeData)
    return {
      title: homeData.metaData.title,
      description: homeData.metaData.description,
      icon: '/favicon.ico',
      openGraph: {
        images: appSetting.baseUrl + homeData.sliderData[0].src,
        title: homeData.metaData.title,
        description: homeData.metaData.description,
        url: appSetting.baseUrl,
      },
    }
  else {
    return null
  }
}
export default function Admin() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err)
    }
  }
  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout'>
        <Navigation black />
        <main id='bt-main' className='bt-main bt-sectionspace bt-haslayout'>
          {auth.currentUser == null ||
          auth.currentUser.email != 'lenggiauit@gmail.com' ? (
            <SignIn signIn={signInWithGoogle} />
          ) : (
            <>
              <div className='row'>
                <div className='col-md-11 text-end pr-5'>
                  <button className='btn btn-success' onClick={logOut}>
                    Logout
                  </button>
                </div>
              </div>
              <AdminBookingList />
            </>
          )}
        </main>
      </div>
    </>
  )
}
