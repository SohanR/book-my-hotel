import React from 'react';
import { Link } from 'react-router-dom';
import ConnectNav from '../components/ConnectNav';
import DashboardNav from '../components/DashboardNav';

const DashboardSeller = () => {
  return (
    <>
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav/>
        </div>
        
        <div className='container-fluid p-4'>
            <DashboardNav/>
        </div>
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
    </>
  )
}

export default DashboardSeller