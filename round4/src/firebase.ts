import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA0X_2G4Q4FACVZ_txovRZVOvwmc2kfT7Y',
  authDomain: 'react-shop-3651f.firebaseapp.com',
  databaseURL: 'https://react-shop-3651f-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-shop-3651f',
  storageBucket: 'react-shop-3651f.appspot.com',
  messagingSenderId: '82336324572',
  appId: '1:82336324572:web:e1e2060c39f28928d04d19'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
