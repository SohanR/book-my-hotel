import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/error.css'

const Error = () => {
  return (
    <div className='error-body'>
      <div className="error-page">
        <div className="content">
          <h1 data-text="404">404</h1>
          <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
          <p>Sorry, the page you're looking for doesn't exist.If you think something is broken, report a problem</p>
          <div className="btns">
              <Link to="/">return home</Link>
              
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Error