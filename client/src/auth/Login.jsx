import React from 'react'
//import { toast } from 'react-toastify'
//import { login } from '../actions/auth'
import LoginForm from '../components/LoginForm'



const Login = () => {
  return (
    <>
        <div className='container-fluid h1 p-5 text-center'>
          <h1>Login</h1>
        </div>

        <div className='container'>
          <div className='row' >
            <div className='col-md-6 offset-md-3'>
              <LoginForm/>
            </div>
          </div>      
        </div>    
    </>
  )
}

export default Login