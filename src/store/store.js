import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from '../globalState/createSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
 })
export const store = configureStore({
    reducer:{
        usersReducers: userReducer
    },
    // middleware:{

    //     customizedMiddleware
    // }
})