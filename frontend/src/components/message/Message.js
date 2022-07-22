import React from 'react'
import './message.css'
import {format} from 'timeago.js'

function Message({message,own}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <div className= { own ? "message own" : 'message'}>
        <div className="messageTop">
            <img src="/assets/person/2.jpeg" className='messageImg' alt="" />
            <p className='messageText' >{message.text}</p>
        </div>
        <div className="messageBottom">
        {format(message.createdAt)}
        </div>
    </div>
    </>
  )
}

export default Message