import { HomeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHotel, sellerHotels } from '../actions/hotel';
import { createConnectAccount } from '../actions/stripe';
import SmallCard from '../components/cards/SmallCard';
import ConnectNav from '../components/ConnectNav';
import DashboardNav from '../components/DashboardNav';

const DashboardSeller = () => {

  const {auth} = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  // for loading the all seller hotels if exist
  useEffect(() =>{
    loadSellerHotels();
  },[])

  const loadSellerHotels = async () => {
    let {data} = await sellerHotels(auth.token);
    setHotels(data);
  }

  // handle setup payouts button click
  const handleClick = async () =>{

    setLoading(true)
    try {
      let res = await createConnectAccount(auth.token)
      console.log(res);
      window.location.href = res.data;  // will open new window with link of stripe onboarding proccess.
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed, try again");

      setLoading(false);
    }



  }

  const handleHotelDelete  = async (hotelId) =>{
    if(!window.confirm("Are you sure you want to delete this Hotel?")) return;
    deleteHotel(auth.token, hotelId)
    .then((res) =>{
      toast.success(`${res.data.title} is Deleted`)
      loadSellerHotels()
    })
  }

  // for stripe connected
  const connected = () =>{
    return (
      <div className="container-fluid">
      <div className='row' >
        <div className='col-md-10' >
          <h2>Your Hotels</h2>
        </div>
        <div className='col-md-2'>
          <Link to='/user/hotels/new' className='btn btn-primary' > + Add Hotel</Link>
        </div>
      </div> 

      <div className='row' >
        {
          hotels.map((h)=>(
            <SmallCard key={h._id} h={h} owner={true}  handleHotelDelete={handleHotelDelete} />
          ))
        }
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
            
            <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3" >
              {loading ? "Processing....." : "Setup Payouts"}
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
        { auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected() : notConnected()}
    </>
  )
}

export default DashboardSeller