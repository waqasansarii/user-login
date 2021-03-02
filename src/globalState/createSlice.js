import { Initial_State } from './initialState'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'

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

export const githubUsers = createAsyncThunk(
    'githubuser/search',
    async (data)=> {
    //  console.log(await data)
     return await data
    }
)

export const saveGithubUsersDataInDatabase = createAsyncThunk(
    'githubUsersDataSave/firestore',
    async (data)=>{
        
        return await data
        // firebase.firestore().collection('historyGithubUsers').doc(id)
    }
)
  
              //Create slice


const Users = createSlice({
    name: 'users',
    initialState: Initial_State,
    reducers: {
        // set initial state empty after login so that previous data not show 
        LogOutUser: (state) => {
            state.users={
                email:'',
                id:'',
                name:'',
                img:''
            }
            // console.log(action)
        },
        // githubUsers:(state,action)=>{
        //       console.log(action.payload)
        // }
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
        [githubUsers.fulfilled]:(state,action)=>{
            // console.log(action.payload)
            const {name,id,avatar_url,login,created_at,followers,public_repos,message} = action.payload
            // let date = new Date()
            
            // console.log()
            state.githubUser={
                name,
                img:avatar_url,
                id,
                login,
                created_at,
                followers,
                public_repos,
                message
            }
        },
        [saveGithubUsersDataInDatabase.fulfilled]:(state,action)=>{
            let {created,followers,id,img,name,repos} = action.payload
            state.searchHistory={
              name,
              img,
              created,
              followers,
              repos,
              id
            }
            console.log(action.payload)
        }
    }
})

export const { LogOutUser } = Users.actions


export const userReducer = Users.reducer