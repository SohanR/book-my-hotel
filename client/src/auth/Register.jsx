import axios from 'axios';
import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit =async (e) => {
      e.preventDefault();
  
     // console.table({name, email, password})
     //https://cors-anywhere.herokuapp.com/http://localhost/3010/

     try {
      const res = await axios.post("http://localhost:3010/api/register", {
        name,
        email,
        password
      })
  
      console.log('register user', res);
       
     } catch (error) {
       console.log(error);
     }
    

    }
  return (
    <>
      <div className='container-fluid bg-secondary h1 p-5 text-center'>
        <h1>Register</h1>
      </div>

      <div className='container' >
        <div className='row'>
          <div className='col-md-6 offset-md-3' >
            <RegisterForm handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
          
          </div>
        </div>

      </div>
    </>
  )
}

export default Register