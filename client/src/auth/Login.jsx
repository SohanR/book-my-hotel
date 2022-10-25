import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginForm from '../components/forms/LoginForm';



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA: ", {email, password});
    
    try {
      let res = await login({email, password});

      if(res.data){

        // save response data in redux and local storage then redirect
      
        //console.log(res.data);

        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data))
        // save user and token to redux
        dispatch({
          type:"LOGGED_IN_USER",
          payload:res.data,
        })

        toast.success("Log in successful")
        //redirect to home page
        navigate('/')

      }
    } catch (error) {
      console.log(error);

      if (error.response.status === 400) toast.error(error.response.data)
    }
  }
  return (
    <>
        <div className='container-fluid h1 p-5 text-center'>
          <h1>Login</h1>
        </div>

        <div className='container'>
          <div className='row' >
            <div className='col-md-6 offset-md-3'>
              <LoginForm 
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            </div>
          </div>      
        </div>    
    </>
  )
}

export default Login