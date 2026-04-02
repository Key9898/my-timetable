import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyACvUZX-R5x9kKErJDykIjtsv8vxdZCQsI',
  authDomain: 'chronos-25d76.firebaseapp.com',
  projectId: 'chronos-25d76',
  storageBucket: 'chronos-25d76.firebasestorage.app',
  messagingSenderId: '69626362561',
  appId: '1:69626362561:web:486e9c10ce89fd530cb240',
  measurementId: 'G-S8DX5JB9H8',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
