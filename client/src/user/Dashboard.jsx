// show a navbar in dashboard..... it will show 2 components
// 1 for booking and a button to browse hotels
// 2 for show all hotels you have posted and a button to add new
// use tabs as nav




import React from 'react'
import { Link } from 'react-router-dom'
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'

const Dashboard = () => {
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
              <Link to='/' className='btn btn-primary' > Browse Hotels</Link>
            </div>
          </div>          
        </div>
    </>
  )
}

export default Dashboard