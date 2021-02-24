import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import firebase from 'firebase'


const SignupForm = () => {

    const history = useHistory()

    let [img, setImg] = useState()

    const handleChange = (e) => {
        
        setImg(e.target.files[0])
        console.log(img)
    }
    //   console.log(img)
    let db = firebase.firestore().collection('users')
    let storage = firebase.storage()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            file: '',
            password: ''
        },
        onSubmit: (value) => {

            // create new account 

            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then((res) => {
                    let userData = res.user;
                    db.doc(userData.uid).set({
                        name: value.name,
                        id: userData.uid,
                        // img:img,
                        email: userData.email
                    })
                        .then(() => {
                            console.log('added')
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    // upload image in firebase storge in separate folder
                    let store = storage.ref(`users/${userData.uid}`).child('user').put(img)
                    store.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        () => {
                            let downloadurl = store.snapshot.downloadURL
                        })


                    // navigate into dashboard after successfully singup
                    history.push('/dashboard')
                })
                .catch((err) => {
                    alert(err.message)
                })
        },

        // validate email and password 

        validationSchema: yup.object().shape({
            name: yup.string()
                .required('Name is requried !'),
            email: yup.string()
                .email('Invalid Email')
                .required('Email is required!'),

            password: yup.string()
                .min(6, 'To short!')
                .max(18, "To long!")
                .required('Password is required!')
        }),


    })

    return (
        <div>
            <div className='main_login_div'>
                <h1 className='login_head'>SignUp</h1>
                <div className='input_fields_div'>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className='inputs'
                        placeholder='Name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ?
                        <div className='error'>{formik.errors.name}</div>
                        : null
                    }
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='inputs'
                        placeholder='Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ?
                        <div className='error'>{formik.errors.email}</div>
                        : null
                    }

                    <input
                        type="password"
                        name="password"
                        id="password"
                        className='inputs'
                        placeholder='Password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ?
                        <div className='error'>{formik.errors.password}</div>
                        : null
                    }
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className='inputs'
                        onChange={(e) => handleChange(e)}
                    //   value={img}
                    />
                    <button type='submit' onClick={formik.handleSubmit} className='login' >Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignupForm