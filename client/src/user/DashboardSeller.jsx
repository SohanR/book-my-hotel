import { HomeOutlined } from '@ant-design/icons';
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
          <div className='col-md-6 offset-md-3 text-center' >
          <HomeOutlined className="h1" />
            <h4>Setup payment method to post rooms</h4>
            <p className="lead">
              BookMyHotel partners with stripe to transfer earnings to yours bank account
            </p>
            
            <button className="btn btn-primary mb-3" >
              Setup Payouts
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding process.
              </small>
            </p>
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