import React,{useState} from 'react'
import Button from './btn'
import './style.css'
import {githubUsers} from '../../globalState/createSlice'
import {useDispatch} from 'react-redux'

const SearchBar = ()=> {

    const dispatch = useDispatch()

    let [value,setValue] = useState('')
    let [user,setUser] = useState('')

    const handleChange = (event) => {
        // console.log(event.target.value)
        setValue(event.target.value)
    }
    const handlegithubUsers = async () => {
        let res = await fetch(`https://api.github.com/users/${value}`)
        let json =await res.json()
        console.log(json)
        setUser(json)
        dispatch(githubUsers(json))
        // return json
        setValue('')
      } 
    //   console.log(user)

    return(
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