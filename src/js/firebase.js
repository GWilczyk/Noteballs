import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDhmWbG1ddtresb2IcLzCD7VrR5ffnao7g',
	authDomain: 'noteballs-6ad41.firebaseapp.com',
	projectId: 'noteballs-6ad41',
	storageBucket: 'noteballs-6ad41.appspot.com',
	messagingSenderId: '784572360378',
	appId: '1:784572360378:web:872300c7da382d44fac483',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }
