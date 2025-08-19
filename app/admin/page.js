'use client'
import Navigation from '@/components/navigation'
import AdminBookingList from '@/components/adminBookingList'
import { auth, googleProvider } from '../firebase'
import SignIn from '@/components/auth'
import { signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

let appSetting = require('/appSetting.json')

export default function Admin() {
  const [user, setUser] = useState(null)
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch((error) => {
      console.log(error.message)
    })
  }
  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          setUser(user)
        }
      },
      (error) => reject(error)
    )
  }, [])

  return (
    <>
      <div id='bt-wrapper' className='bt-wrapper bt-haslayout '>
        <Navigation black />
        <main id='bt-main' className='bt-main bt-sectionspace bt-haslayout'>
          {user == null || user?.email != 'lenggiauit@gmail.com' ? (
            <SignIn signIn={signInWithGoogle} />
          ) : (
            <>
              <div className='row px-5'>
                <div className='col-md-12 text-end'>
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
