import React from 'react'
import Header from '../components/header/header'
import GithubUser from '../components/githubUser/githubUser'
import SearchBar from '../components/searchBar/searchbar'

const DashBoard = () => {
    return(
        <div>
          <Header />
          <SearchBar />
          <GithubUser />
        </div>
    )
}
export default DashBoard