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
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
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

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in.
          setUser(user)
        } else {
          // No user is signed in.
          reject('no user logged in')
        }
      },
      // Prevent console error
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
