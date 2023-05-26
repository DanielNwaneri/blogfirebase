import './App.css';
import NavBar from './Component/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import Post from './Component/Post';
import Register from './Component/Register';
import {auth} from './Firebase_config/Firebase_config';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';


function  App () {
  const [user, setuser] = useState(null)

  const [isAuth, setisAuth] = useState(localStorage.getItem('isAuthorised'));

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        setuser(authUser)  
      }else{
        setuser(null);
      }

    })
  }, [])

  return (
<div>

  <ToastContainer/>
  <NavBar isAuth={ isAuth} setisAuth = {setisAuth} setuser={setuser} />
  <Routes>
    <Route path='/' element={<Home isAuth={isAuth}/>} />
    <Route path='/login' element={<Login setisAuth = {setisAuth} setuser={setuser} />} />
    <Route path='/register' element={<Register setisAuth = {setisAuth } setuser = {setuser} />}/>
    <Route path='/post' element={<Post isAuth={isAuth} />}/>
  </Routes>

</div>
  )
}

export default App;
