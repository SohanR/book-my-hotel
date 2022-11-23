import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stripeSuccessRequest } from '../actions/stripe'

const StripeSuccess = () => {

    const {hotelId} = useParams()
    const navigate = useNavigate()

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

            console.log("StripeSuccessRequest ---->", res.data.success);
        })
    }, [hotelId]);

  return (
    <div className='container' >
    <div className="d-flex justify-content-center p-5">
        < LoadingOutlined className="display-1 text-danger p-5" />
    </div>
</div>
  )
}

export default StripeSuccess