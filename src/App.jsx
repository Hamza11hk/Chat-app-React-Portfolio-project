import { useState } from 'react'
import './App.css'
import { auth, db } from './firebase'
import { useAuthsate } from 'react-firebase-hooks'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

function App() {
  const [user] = useAuthsate(auth)
  const [currentRoom, setCurrentRoom] = useState('')
  
  const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const { uid, displayName, photoURL } = await auth.currentUser;
    await addDoc(collection(db, "Users") {
      name: displayName,
      avatar: photoURL,
      createdAt: Date.now(),
      uid
    });
  }

  const signOut = () => {
    auth.signOut()
  }



  return (
    <div className='text-xl text-center'>
      Hello chat application
    </div>
  )
}

export default App
