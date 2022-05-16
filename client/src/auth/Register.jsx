import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.table({name, email, password});

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
      name, email, password
    })

    console.log(" Register User ===>>>" , res);
    toast.success("Registration Success, Please log in!")
    navigate("/login")
    } catch (error) {
      console.log("Registration error: ", error);
      if(error.response.status === 400){
        toast.error(error.response.data)
      }
    }
  }

  return (
    <>
      <div className='container-fluid h1 p-5 text-center'>
        <h1>Register</h1>
        {console.log(process.env.REACT_APP_API)}
      </div>

      <div className="container" >
        <div className="row">
          <div className='col-md-6 offset-md-3'>
            <RegisterForm 
              handleSubmit={handleSubmit} 
              name={name} 
              setName={setName}
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

export default Register