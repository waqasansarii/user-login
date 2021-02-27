import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'



const GithubUser = () => {

    const selector = useSelector((state) => {
        return state.usersReducers.githubUser
    })

    
    const { name, id, login, img, public_repos, created_at, followers,message } = selector
    // console.log(message)

    if(!name){
        if(message){
          return   <div className='not_found'>{message} Enter valid user name</div>
       }
        return <div></div>
    }

    return (
        <div>
            <div className='github_user_profile_div'>
                <div>

                    <img className='img' src={img} alt="" />
                </div>
                <div className='user_details'>

                    <p className='name'>Name: {name}</p>
                    <p>username : {login}</p>
                    <p>Public Repos : {public_repos}</p>
                    <p>Account Created : {created_at}</p>
                    <p>Followers : {followers}</p>
                </div>
            </div>
        </div>
    )
}
export default GithubUser
