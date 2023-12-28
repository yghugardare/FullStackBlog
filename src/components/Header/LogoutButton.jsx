import React from 'react'
import authservice from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';


function LogoutButton() {
  const dispatch = useDispatch();
  function logoutHandler(){
    authservice.logout().then(()=> {
      dispatch(logout());
    })
  }
  return (
    <button 
    onClick={logoutHandler}
    className=' inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '>
      Logout
    </button>
  )
}

export default LogoutButton