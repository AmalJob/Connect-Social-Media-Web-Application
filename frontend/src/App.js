
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import EditPost from "./components/EditPost";
import Messenger from "./pages/messenger/Messenger";
import TabPanel from "./components/UserProfile/UserInfo";
import UserInfo from "./components/UserProfile/UserInfo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserHome from "./pages/UserHome";
import UserProfile from "./pages/UserProfile";


const Routing = ()=>{
  const navigate= useNavigate()

  // useEffect(()=>{
  //  const user= localStorage.getItem('userDetails')
  //  if(user){
  //    navigate('/')
  //  }else{
  //    navigate('/login')
  //  }
  // },[])
  const userdata = useSelector((state)=> state.user.value)
  // console.log("data",userdata.user);
   
  return(
    <Routes>
           
            <Route exact  path='/'   element={ userdata ?  <UserHome/> : <Login/> }  ></Route>
            <Route path="/login"  element= { <Login/>} ></Route>
            <Route path="/signup" element={ <SignUp/>} ></Route>
            <Route path="/profile/:username" element={<UserProfile/>} ></Route>
            <Route path="/editpost/:postId" element={<EditPost/>} ></Route>
            <Route path="/edituserinfo/:userId" element={<UserInfo/>} ></Route>
            <Route path="/messenger" element={<Messenger/>} ></Route>
          </Routes>
  )

}

function App() {
 
  
 

  return (
     <div>

        <BrowserRouter>
        <Routing/>
          {/* <Routes>
           
            <Route exact  path='/'   element={  <UserHome/>  }  ></Route>
            <Route path="/login" element={  <Login/>} ></Route>
            <Route path="/signup" element={ <SignUp/>} ></Route>
          </Routes> */}
          </BrowserRouter>  
     </div>
 
  );
}

export default App;
