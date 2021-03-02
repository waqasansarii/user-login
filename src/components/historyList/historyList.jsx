import React from 'react'
import './style.css'
import {useSelector} from 'react-redux'


const HistoryList = () => {

    const selector = useSelector((state)=>{
        return state.usersReducers.searchHistory
    })

    console.log(selector)
    return(
        <div>
            <div>
                <h1 style={{textAlign:'center'}}> History </h1>
                <div>
                    
                </div>
            </div>
        </div>
    )
}
export default HistoryList