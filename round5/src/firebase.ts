import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDkzeVTWU8UNGvtotE2NjI5Xws7TdA_uXY',
  authDomain: 'first-firebase-d7ffa.firebaseapp.com',
  databaseURL: 'https://first-firebase-d7ffa-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'first-firebase-d7ffa',
  storageBucket: 'first-firebase-d7ffa.appspot.com',
  messagingSenderId: '507458089242',
  appId: '1:507458089242:web:29ac59dc993aa57af5bca3'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
