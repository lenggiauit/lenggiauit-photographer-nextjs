'use client'
import { signInWithCredential } from 'firebase/auth'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'

export default function SignIn(props) {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <h2>Login page</h2>
        </div>
        <div className='row'>
          <div className='col-md-3 offset-md-4 mt-5'>
            <button className='btn btn-danger w-100' onClick={props.signIn}>
              Signin with Google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
