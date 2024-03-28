import { useState } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Chat from './components/Chat';
import RoomForm from './components/RoomForm';

function App() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState('');

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const { uid, displayName, photoURL } = await auth.currentUser;
    await addDoc(collection(db, 'Users'), {
      name: displayName,
      avatar: photoURL,
      createdAt: Date.now(),
      uid
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className='text-xl w-full h-screen px-[5%] text-center flex flex-col'>
      <div className='flex justify-between w-full h-[5rem] items-center'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-900'>Chat Room</h1>
        {
          user && <h2>Welcome {user.displayName}</h2>
        }

        {
          user ? (
            <button onClick={signOut} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
              Sign Out
            </button>
          ) : (
            <button onClick={googleSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
              Google Sign In
            </button>
          )
        }
      
      </div>

      {
        !user && <div className='w-full h-[35rem] flex flex-col justify-center items-center font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-t from-blue-700 to-purple-900'>

          <div>Welcome to Chat Room, Sign In Now</div>
          <p className=" font-light text-xl text-gray-500 mt-8">Click the Google Sign In button to proceed.</p>
          
        </div>
      }

      {
        user && currentRoom && <Chat setCurrentRoom={setCurrentRoom} room= {currentRoom} />
      }
      
      {
        user  && !currentRoom && <RoomForm setCurrentRoom={setCurrentRoom}/>
      }

	    <footer className="mt-auto py-4 text-gray-600 text-center">
        <p>&copy; 2024 Chat Room. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
