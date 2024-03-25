import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../firebase'
import { addDoc, collection, limit, query, orderBy, limit, onSnapshot, QuerySnapshot } from 'firebase/firestore'


const Chat = ({ room, setCurrentRoom }) => {

    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState('') // this is input.  
    
    
    const sendMessage = async() => {
        if(message.trim() === "") {
            alert('Please enter a message!') 
            return;
        }

    const {uid, displayName, photoURL} = auth.currentUser;

    await addDoc(collection(db, room), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: Date.now(),
        uid
    })

    sendMessage('')
    // scroll to the bottom of messages.
    scrollRef.current.scroll({top: scrollRef.current.scrollHeight, behavior: 'smooth'})
        
    }

    useEffect(() => {

        const q = query(
            collection(db, room) ,
            orderBy("createdAt"),
            limit(50)
        )

        const unsubscribe = () => onSnapshot(q, (snapshot)=> {
            let thesemessages = [];
            QuerySnapshot.forEach((doc) => {

                thesemessages.push( { ...doc.data(), id: doc.id})
                
            })
            setMessages(thesemessages)
        })

        return () => unsubscribe;

    },[])


    useEffect(() => {

        scrollRef.current.scroll({top: scrollRef.current.scrollHeight, behavior: 'smooth'});

    }, [messages])


    let scrollRef = useRef(null)

  return (
    <div className='mt-4 w-full border-2 bg-slate-200 shadow-xl rounded-xl p-4 group-has-[80%] flex flex-col relative'>
        <div className='absolute left-1 top-1 p-3 text-white bg-red-500 rounded-xl text-xm z-[30]'>
            Leave
        </div>
        <div className='w-full overflow-auto h-[90%] pt-10' ref={scrollRef}>
            {
                messages?.map(curr => {
                    return(
                        <div>messages</div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Chat