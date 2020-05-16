import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Information from "./Information"
import Login from './Login';
import AuthApi from "./Auth/AuthAPI";
import Cookies from 'js-cookie'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";


function Home() {
    const [auth,setAuth] = React.useState(false);

    const readcookie = ()=>{
        const user = Cookies.get("user");
        if(user)
        {
            setAuth(true);
        }
    }
    
    React.useEffect(()=>{
        readcookie()
    },[])

    return (
       <AuthApi.Provider value={{auth,setAuth}}>
        <Router>
            <Routes></Routes>
        </Router>
       </AuthApi.Provider> 
        
        
    );
}
const Routes = () =>{
    const Auth = React.useContext(AuthApi)
    return(
        <Switch>
            <ProtectedLogin path="/login" component={Login} auth={Auth.auth} ></ProtectedLogin>
            <ProtectedRoute path="/Information" auth={Auth.auth} component={Information}></ProtectedRoute>
        </Switch>
    )
}
const ProtectedRoute = ({auth,component:Component,...rest}) =>{
    return(
        <Route
            {...rest}
            render={()=>
            (auth===true)?(<Component/>):(<Redirect to = "/login"/>)
                
            }
        />

    )
}
const ProtectedLogin = ({auth,component:Component,...rest}) =>{
    console.log(rest)
    return(
        <Route
            {...rest}
            
            render={()=>
            (!auth)?(<Component/>):(<Redirect to = "/Information"/>)
                
            }
        />

    )
}

export default Home;
