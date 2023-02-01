import React, { useState } from 'react'
import { BsPerson } from "react-icons/bs"
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Logo from "../assets/logo.png"
import './../styles/topNav/topNav.css'

const TopNav = () => {

  const { auth } = useSelector((state) => ({...state}))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", (e) => setIsNavOpen(false));

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

    <div className='topnav' state={isNavOpen ? 1 : 0} id='up'>

      <div className="brand">
        <img height='70px' src={Logo} alt="logo" />
      </div>
      <div className="toggle">
        {isNavOpen ? (
          <MdClose onClick={() => setIsNavOpen(false)} />
        ) : (
          <GiHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpen(true);
            }}
          />
        )}
      </div>

      <div className={`links ${isNavOpen ? "show" : ""}`} >
        <Link className="navlink" to="/">Home</Link>
        <Link className="navlink" to="/hotels"> Hotels</Link>
        <Link className="navlink" to="/offer">Offer</Link>
        <Link className="navlink" to="/tour">Tour</Link>
        <Link className="navlink" to="/testimonial">Testimonial</Link>
        
    </div>

<div className='account' >
{auth !== null && (
            <Link className="dashboard" to="user/dashboard"><BsPerson /> Dashboard</Link>
          )}
          {auth !== null && (
              <button  onClick={logout} className="btn btn-outline-danger m-r-3">Logout</button>
            )
          }
          {auth === null && (
            <>
              <Link className="nl" to="/login"><BsPerson /> Login</Link>

              <Link className="nl" to="/register">Sign Up</Link>
            </>
          )}
</div>



    </div>
    // style={{display: 'flex',gap: '3rem', listStyleType: 'none',marginRight: '100px',marginLeft: '-100px'}}
  )
}


export default TopNav