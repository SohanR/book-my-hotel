import React from 'react'
import DashboardNav from '../components/DashboardNav'

const DashboardSeller = () => {
  return (
    <>
        <div className="container-fluid bg-secondary p-5">
            <h1>Dashboard</h1>
        </div>
            <DashboardNav/>

        <div className="container">
            <p>Show all Hotels and a add new button to add more hotels</p>
        </div>
    </>
  )
}

export default DashboardSeller