import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDFsX8J8D011iJf_CHmLL74oPCdIKLfT9M",
    authDomain: "meta-hub-85320.firebaseapp.com",
    projectId: "meta-hub-85320",
    storageBucket: "meta-hub-85320.appspot.com",
    messagingSenderId: "311456367994",
    appId: "1:311456367994:web:d802f6369f8a2e7fb382c3"
}

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig)
const db = getFirestore(FIREBASE_APP)
const auth = getAuth(FIREBASE_APP)

export default db
