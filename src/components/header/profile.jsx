import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import avater from '../../avater/avater.png'
import './style.css'


const Profile = () =>{

    
    const userSelector = useSelector((state)=>{
        return state.usersReducers.users
    })

    let {email,id,name, img} = userSelector

    

    // let urlImg = URL.createObjectURL(img)


    return(
        <div>
            <h1 style={{textAlign:'center',marginTop:'20px',marginBottom:'20px'}}>welcom dear</h1>
            <div className='profile_main'>
                <div className='img_div'>
                    {img?
                    <img className='user_img' src={img} alt=""/>
                    :
                    <img className='user_img' src={avater} alt=""/>

                    }
                </div>
                <div className='info_div'>
                    <p className='info'>{name}</p>
                    <p className='info'> {email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile