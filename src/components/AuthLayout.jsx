import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


// make a protected container in AuthLayout.jsx
// protected container for pages in the app
export default function Protected({children,authentication=true}){
    const navigate = useNavigate();
    const [loader,setLoader] =  useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        // authentication = is authentication required
        // authStatus =  are you authenticatied , ie loged in or signed up?
        if(authentication && authStatus !== authentication){
            navigate('/login');
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

