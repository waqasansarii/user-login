import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import aavater from '../../avater/avater.png'


const HistoryList = () => {

    const selector = useSelector((state) => {
        return state.usersReducers.searchHistory
    })



    console.log(selector)
    return (
        <div>
            <div className='main_History_div' >
                <h1 style={{ textAlign: 'center', marginBottom: '50px' }}> History </h1>
                {selector.map((value, i) => {
                    let date = value.created.slice(0,10)
                    return (

                        <div className='cards' key={i}>
                            {
                                value.img ?
                                    <img src={value.img} className='avater' alt="" />
                                    :
                                    <img src={aavater} className='avater' alt="" />
                            }
                            <div className='user_info_div'>
                                <p className='name_user'>{value.name}</p>
                                <p className='date'>{date}</p>

                                <div className='repo_follrs_div'>
                                    <p className='fowlrs'>Followers : {value.followers}</p>
                                    <p className='repos'>Repos : {value.repos}</p>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default HistoryList