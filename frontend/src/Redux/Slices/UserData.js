import {createSlice} from '@reduxjs/toolkit'

export const UserDataSlice = createSlice({
    name: "user",
    initialState:{
        value:{}
    },
    reducers:{
        signIn:  (state, action)=>{
            state.value= action.payload
        }
    }
    
})

export const {signIn} = UserDataSlice.actions;
export default UserDataSlice.reducer;