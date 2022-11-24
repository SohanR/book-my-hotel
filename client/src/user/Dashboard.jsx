// show a navbar in dashboard..... it will show 2 components
// 1 for booking and a button to browse hotels
// 2 for show all hotels you have posted and a button to add new
// use tabs as nav




import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userHotelBookings } from '../actions/hotel'
import BookingCard from '../components/cards/BookingCard'
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'

const Dashboard = () => {

  const {auth} = useSelector((state) => state )
  const {token} = auth;

  const [booking, setBooking] = useState([]);

  useEffect(() => {
    loadUserBookings()
    
  }, []);


  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);

    console.log(res);
    setBooking(res.data)
  }
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

          <div className="row">
            {
            booking && booking.map(b =>(
                <BookingCard key={b._id} hotel={b.hotel} session={b.session} orderedBy={b.orderedBy} />
              ))
            } 

            {/* <pre>{JSON.stringify(booking,null,4)}</pre> */}
          </div>      
        </div>
    </>
  ) 
}

export default Dashboard