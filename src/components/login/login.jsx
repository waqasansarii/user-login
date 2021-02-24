import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './style.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import WithGoogle from './withGoogle'
import firebase from 'firebase'



const LoginForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (value) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then((data) => {
                    history.push('/dashboard')

                }).catch((err) => {

                    alert(err.message)
                    return err.message
                })
        },

        validationSchema: yup.object().shape({
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
                <h1 className='login_head'>Log In</h1>
                <div className='input_fields_div'>

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
                    <button type='submit' onClick={formik.handleSubmit} className='login' >Log in</button>
                    <div className='new_acount_div'>

                        <span>if you have no account </span>
                        <Link to='/signup'>
                            create an account
                    </Link>
                    </div>
                    <p style={{ textAlign: 'center' }}>or</p>
                    <WithGoogle />
                </div>
            </div>
        </div>
    )
}

export default LoginForm