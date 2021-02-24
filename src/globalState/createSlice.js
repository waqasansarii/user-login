import { Initial_State } from './initialState'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// export const signUpWithGoogle = createAsyncThunk(
//     'userSignup/Google',
//     async (data) => {
//         return  await data;
       
//     }
// )

// user image from firebase storage

export const userImage = createAsyncThunk(
        'userSignup/Google',
        async (url) => {
            console.log(url)
            return  await url;
           
        }
    )

  // get current user data to show in dashboard

export const getCurrentUserInfo = createAsyncThunk(
    'currentUserInfo',
    async (data)=>{
        return await data 
    }
)






const Users = createSlice({
    name: 'users',
    initialState: Initial_State,
    reducers: {

        // set initial state empty after login so that previous data not show 

        LogOutUser: (state, action) => {
            state.users={
                email:'',
                id:'',
                name:'',
                img:''
            }
            // console.log(action)
        }
    },
    extraReducers: {
        [getCurrentUserInfo.fulfilled]: (state, action) => {
            // console.log( action)
            state.users={
                email:action.payload.email,
                img:action.payload.img,
                name:action.payload.name,
                id:action.payload.id
            }

        },
        [getCurrentUserInfo.pending]:()=>{
               console.log('pemding')
        }
    }
})

export const { LogOutUser } = Users.actions


export const userReducer = Users.reducer