// show a navbar in dashboard..... it will show 2 components
// 1 for booking and a button to browse hotels
// 2 for show all hotels you have posted and a button to add new
// use tabs as nav




import React from 'react'
import DashboardNav from '../components/DashboardNav'

const Dashboard = () => {
  return (
    <>
        <div className="container-fluid bg-secondary p-5">
            <h1>Dashboard</h1>
        </div>
            <DashboardNav/>
        <div className="container">
            <p>Show all bookings and a button to browse hotels</p>
        </div>
    </>
  )
}

export default Dashboard