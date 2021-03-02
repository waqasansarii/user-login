import React from 'react'
import Header from '../components/header/header'
import GithubUser from '../components/githubUser/githubUser'
import SearchBar from '../components/searchBar/searchbar'
import {useSelector} from 'react-redux'

const DashBoard = () => {

  const selector = useSelector((state)=>{
    return state.usersReducers.users
  })

  // console.log(selector)
  const {id} = selector;

  if(!id){
    return <div style={{textAlign:'center'}}>loading...</div>
  }

    return(
        <div>
          <Header />
          <SearchBar />
          <GithubUser />
        </div>
    )
}
export default DashBoard