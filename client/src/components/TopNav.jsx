import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const TopNav = () => {

  const { auth } = useSelector((state) => ({...state}))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // log out functionality
  const logout = () =>{
    dispatch({
      type: 'LOGOUT',
      payload:null
    })
    window.localStorage.removeItem("auth")
    toast.info("You are logged out")
    navigate('/login')
  }


  return (
    <div className='nav bg-light d-flex justify-content-between' >
        <Link className="nav-link" to="/">Home</Link>


      {auth !== null && (<button  onClick={logout} className="btn btn-outline-danger m-r-3">Logout</button>)}







        {auth === null && (
          <>
            <Link className="nav-link" to="/login">Login</Link>

            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}


    </div>
  )
}

export default TopNav