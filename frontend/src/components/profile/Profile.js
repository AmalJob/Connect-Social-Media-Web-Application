import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Profile.css'
import axios from 'axios'



function Profile() {
  const [user, setUser] = useState({})
 
  useEffect(() => {
    const fetchUser = async()=>{
      const res = await axios.get(`/users?username=test`);
    setUser(res.data)
    }
    fetchUser();
  },[])
  return (
    <>
    <Card sx={{mt:1}} >
    <div className="profile">
    <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="/assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          </div>
          </div>
        
    </Card>
    </>
  )
}

export default Profile