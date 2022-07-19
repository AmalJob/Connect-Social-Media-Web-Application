import axios from 'axios'

export const loginCall= async (userCredential, dispatch) =>{
    
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("auth/login", userCredential)
        dispatch({type:"LOGIN_SUCCESS", payload: res.data.user});
           localStorage.setItem("userDetails",JSON.stringify(res.data.user))
        localStorage.setItem('token', res.data.token)
       
        console.log("data",res.data.token);
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload: error});
    }
}