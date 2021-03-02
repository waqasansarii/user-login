import React, { useEffect, useState } from 'react'
import Button from './btn'
import './style.css'
import { githubUsers, saveGithubUsersDataInDatabase } from '../../globalState/createSlice'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'

const SearchBar = () => {

    const dispatch = useDispatch()

    const selector = useSelector((state) => {
        return state.usersReducers
    });

    const { users: { id } } = selector;

    // console.log(id)

    let [value, setValue] = useState('')
    let [user, setUser] = useState('')

    const handleChange = (event) => {
        // console.log(event.target.value)
        setValue(event.target.value)
    }
    const handlegithubUsers = async () => {
        let res = await fetch(`https://api.github.com/users/${value}`)
        let json = await res.json()

        // console.log(json)
        setUser(json)
        dispatch(githubUsers(json))

        const objHistory = {
            name: json.name,
            img: json.avatar_url,
            repos: json.public_repos,
            created: json.created_at,
            followers: json.followers,
            id: json.id
        }

        if (json.name) {
            firebase.firestore().collection(`githubUsersHistory`).doc(id).collection('UsersHistory').add(objHistory)
                .then(() => {
                    console.log('added')
                })
                console.log('yes')
                
            } else {
                console.log('failed')
            }
            // return json
            setValue('')
        }
        
        useEffect(()=>{
            
            firebase.firestore().collection('githubUsersHistory').doc(id).collection('UsersHistory').get()
            .then((res)=>{
                res.forEach((data)=>{
                    let getData = data.data()
                    console.log(data.data())
                    dispatch(saveGithubUsersDataInDatabase(getData))
            })
        })
    },[])
    if (!id) {
        return <div></div>
    }
    //   console.log(user)

    return (
        <div>
            <div className='main_search'>
                <h2 className='head'>Search Github Users</h2>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className='search_bar'
                    placeholder='Enter user name'
                    onChange={handleChange}
                    value={value}
                />
                <Button value='Enter'
                    onClick={handlegithubUsers}
                    className='myBtn'
                />

            </div>
            {/* <p>{user.name}</p>
            <img src={user.avatar_url} alt=""/> */}
        </div>
    )
}

export default SearchBar