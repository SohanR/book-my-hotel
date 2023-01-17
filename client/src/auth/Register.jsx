import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../actions/auth';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
  const validName = new RegExp(/^[a-z][a-z\s]*$/);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.table({name, email, password});

    if (validName.test(name)) {
      try {
        const res = await register({
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
    } else{
      toast.error("Name contains letters only!!!")
    }
      
   }



  return (
    <>
      <div className='container-fluid h1 p-5 text-center'>
        <h1>Registration</h1>
       
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
        <p style={{textAlign: 'center',marginTop: '20px'}} >Already have account ? <Link to='/login'>Log in</Link> </p>
      </div>
    </>
  )
}

export default Register