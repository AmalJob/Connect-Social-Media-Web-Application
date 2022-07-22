import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './conversation.css'
function Conversation({conversation , currentUser }) {
  const [user, setUser] = useState(null)
  const tok = sessionStorage.getItem("token");
  const token = JSON.parse(tok);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m)=> m !== currentUser._id);
    const getUser = async ()=>{
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
        };
        const res = await axios('/users?userId='+friendId , config)
        console.log("dd",res);
        setUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [currentUser,conversation])
  
  return (
    <>
    <div className="conversation">
        <img src={ user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png" } className='conversationImg' alt="" />
        <span className="conversationName">
           {user?.username}
        </span>
    </div>
    </>
  )
}

export default Conversation