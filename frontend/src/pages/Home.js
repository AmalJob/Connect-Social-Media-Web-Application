import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {useNavigate} from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar/Rightbar'
import Sidebar from '../components/Sidebar'

function Home() {

    const [mode, setMode] = useState('light')
  const navigate = useNavigate()
    const darkTheme= createTheme({
      palette:{
        mode:mode
      }
    })
    
    useEffect(()=>{
      if(!sessionStorage.getItem('token')){
         navigate('/login')
      }
    })
  

  return (
    <>
        <ThemeProvider theme={darkTheme} >

  
<Box bgcolor={"background.default"} color={"text.primary"} >

 <Navbar/>
   <Stack direction='row' spacing={2} justifyContent='space-between' >

   <Sidebar setMode={setMode} mode={mode} />
   <Feed home />
   <Rightbar/>
   </Stack>
  
   </Box>
   </ThemeProvider>
        </>
  )
}

export default Home