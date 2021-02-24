import React from 'react'

import firebase from '../../config/firebaseConfig'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signUpWithGoogle } from '../../globalState/createSlice'


const WithGoogle = () => {
    const history = useHistory()
    const dispatch = useDispatch()


    const loginWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        let db = firebase.firestore().collection('users')
        firebase.auth().signInWithPopup(provider)
            .then((data) => {
                let userInfo = data.user
                db.doc(userInfo.uid).set({
                    name: userInfo.displayName,
                    id: userInfo.uid,
                    img: userInfo.photoURL,
                    email: userInfo.email
                })
                
                    .then(() => {
                        // console.log('added')
                        // dispatch(signUpWithGoogle(userInfo))
                    })
                    .catch((err) => {
                        console.log(err, 'sent data  failed')
                    })

                history.push('./dashboard')
            })
            .catch((err) => {
                console.log(err, 'failed signup')
            })


    }
    return (
        <>
            <button onClick={loginWithGoogle} className='g_btn'>Sign up with Google</button>

        </>


    )
}

export default WithGoogle