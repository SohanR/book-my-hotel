import React from 'react'
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'

const DashboardSeller = () => {
  return (
    <>
        <div className="container-fluid bg-secondary p-5">
            <ConnectNav/>
        </div>
            <DashboardNav/>

        <div className="container">
            <p>Show all Hotels and a add new button to add more hotels</p>
        </div>
    </>
  )
}

export default DashboardSeller