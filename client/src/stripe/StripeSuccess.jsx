import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { stripeSuccessRequest } from '../actions/stripe'

const StripeSuccess = ({navigate}) => {

    const {hotelId} = useParams()

    const {auth} = useSelector((state) => state )
    const {token} = auth;

    useEffect(() => {
        stripeSuccessRequest(token,hotelId)
        .then(res =>{
            if(res.data.success){
                navigate("/dashboard")            
            } else{
                navigate("/stripe/cancel")
            }
        })
    }, [hotelId]);

  return (
    <div className='container' >
    <div className="col">
        <h2 className='text-center text-success p-5'>Payment Success{hotelId}</h2>
    </div>
</div>
  )
}

export default StripeSuccess