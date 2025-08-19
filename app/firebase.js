import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBWXWPOMydHKpzeOXMKXkZreA4NgBN3YI',
  authDomain: 'lenggiauit-photographer.firebaseapp.com',
  databaseURL: 'https://lenggiauit-photographer-default-rtdb.firebaseio.com',
  projectId: 'lenggiauit-photographer',
  storageBucket: 'lenggiauit-photographer.firebasestorage.app',
  messagingSenderId: '46284989053',
  appId: '1:46284989053:web:472000e076942fb46ac714',
  measurementId: 'G-N0T60FE9E0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('profile')
googleProvider.addScope('email')
