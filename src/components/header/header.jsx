import React,{useEffect} from 'react'
import './style.css'
import firebase from 'firebase'
import {useHistory,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Profile from './profile'
import {LogOutUser} from '../../globalState/createSlice'



const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
   
    const logOut = async () =>{
        firebase.auth().signOut()
        try{
            dispatch(LogOutUser())
            history.push('/')
        }
        // .then((res)=>{
        // })
        catch{
            console.log('failed to push')
        }
    }

    return(
        <div className='header_container'>
            <div className='header_div'>
                {/* <img src="" alt=""/> */}
                <Link to='/history'>History </Link>
                <button onClick={logOut} className='logout_btn'>Log out</button>
            </div>
            <div >
                <Profile />
            </div>
        </div>
    )
}
export default Header