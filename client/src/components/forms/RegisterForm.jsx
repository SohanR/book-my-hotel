import React from 'react'

const RegisterForm = ({ handleSubmit, name, setName, email, setEmail, password, setPassword }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-3">
        <div className='form-group mb-3' >
            <label className="form-label" >Your Name</label>
            <input 
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}            
            />
        </div>

        <div className='form-group mb-3' >
            <label className="form-label" >Your Email</label>
            <input 
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}            
            />
        </div>

        <div className='form-group mb-3' >
            <label className="form-label" >Password</label>
            <input 
                type="password"
                className="form-control"
                placeholder="Enter your Name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}            
            />
        </div>

        <button className="btn btn-primary d-block m-auto" >Register</button>
    </form>
  )
}

export default RegisterForm