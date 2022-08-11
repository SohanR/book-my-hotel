import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ConnectNav from '../components/ConnectNav';
import DashboardNav from '../components/DashboardNav';

const DashboardSeller = () => {

  const {auth} = useSelector((state) => state);

  // for stripe connected
  const connected = () =>{
    return (
      <div className="container-fluid">
      <div className='row' >
        <div className='col-md-10' >
          <h2>Your Bookings</h2>
        </div>
        <div className='col-md-2'>
          <Link to='/hotels/new' className='btn btn-primary' > + Add Hotel</Link>
        </div>
      </div>          
    </div>
    )
  }

  // for not stripe connected
  const notConnected = () =>{
    return ( 
      <div className="container-fluid">
        <div className='row' >
          <div className='col-md-10' >
            <h2>Connect with stripe</h2>
          </div>
        </div>          
      </div>   
    )  
    
  }
  

  return (
    <>
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav/>
        </div>
        
        <div className='container-fluid p-4'>
            <DashboardNav/>
        </div>
        { auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enable ? connected() : notConnected()}
       
      

    </>
  )
}

export default DashboardSeller