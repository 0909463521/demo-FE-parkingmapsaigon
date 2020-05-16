import React, { Component } from 'react'
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'

const Information = ()=> {
   const Auth =React.useContext(AuthApi)

   const ClickLogOut= ()=>{
    Auth.setAuth(false)
    Cookies.remove("user");
   }
  
        return (
            <div>
                <h1>Hi Your information</h1>
                <button onClick={ClickLogOut}>Logout</button>
            </div>
        )
    
}

export default Information
