import React,{useEffect,useState} from 'react'
import './App.css';
import AppRouter from './router/router'
import firebase from 'firebase'
import {getCurrentUserInfo,userImage} from './globalState/createSlice'
import {useDispatch} from 'react-redux'

function App() {

 const dispatch = useDispatch()
  const [loading , setLoading] = useState(false)
  let [currUser, setCurrUser] = useState()
  let [img,setImg] = useState()
  let db = firebase.firestore().collection('users')
let storage = firebase.storage()

    

  useEffect(()=>{
     firebase.auth().onAuthStateChanged(user => {
       setCurrUser(user);
       
       if (user) {
         let downLoad = storage.ref(`users/${user.uid}`).child('user')
         
        //  // get current user image using userid
         
         downLoad.getDownloadURL()
         .then((url)=>{
           let userImg = url
           setImg(userImg)
          //  console.log(userImg)
           dispatch(userImage(userImg))

          })
          .catch((err)=>{
            console.log('failed to download')
          })
          
          // get current user data using user id from database and set in state
          
          db.doc(user.uid).get()
          .then((data)=>{
            
            let userData = data.data()
              dispatch(getCurrentUserInfo(userData))
            }).catch((err)=>{
              console.log('failed to get data from database')
            })
          }
          setLoading(true)
        })
      },[])

      
if(!loading){
  return <div className='load'>loading ...</div>
}

  return (
    <div >
      <AppRouter user={currUser} />
    </div>
  );
}

export default App;
