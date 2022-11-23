import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { diffDays, isAlreadyBooked, read } from '../actions/hotel';
import { getSessionId } from '../actions/stripe';
import HotelImage from '../components/HotelImage';

const ViewHotel = () => {

    const {auth} = useSelector((state) => state )
    

    const [hotel, setHotel] = useState({});

    const [loading, setLoading] = useState(false);

    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const {hotelId} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        loadHotel()
    }, []);

    useEffect(() => {
        if(auth && auth.token){
            isAlreadyBooked(auth.token, hotelId)
            .then(res =>{
                if(res.data.ok) setAlreadyBooked(true)
            })            
        }
    },[])


    const loadHotel = async () =>{
        let res = await read(hotelId)

        setHotel(res.data)

    }

    const handleClick =async (e) =>{
        e.preventDefault();
        setLoading(true)

        if(!auth){
            navigate("/login")
        }

        let res = await getSessionId(auth.token, hotelId);

        //load srtipe
        const stripe  = await loadStripe(process.env.REACT_APP_STRIPE_KEY)

        stripe.redirectToCheckout({
            sessionId:res.data.sessionId
        })
        .then((resul) => console.log(resul))


        console.log("get getSessionId=> ", res.data.sessionId);
    }

  return (
    <>
        <div className='container-fluid bg-secondary p-5 text-center' >
            <h2>{hotel.title}</h2>
        </div>

        <div className="container-fluid" >
            <div className="row">
                <div className="col-md-6">
                    <br />

                    <HotelImage h={hotel} />
                </div>

                <div className="col-md-6">
                    <br />
                    <b>{hotel.content}</b>
                    <p className='alert alert-info mt-3' > BDT {hotel.price}.00  </p>

                    <p className="card-text">
                      <span className='float-right text-primary' >
                         for {diffDays(hotel.from, hotel.to)}
                         {diffDays(hotel.from, hotel.to) <= 1 ? ' Day' : ' Days' }
                      </span>
                    </p>

                    <p>
                        From <br /> {moment(new Date(hotel.from)).format("MMMM Do YYYY")}
                    </p>

                    <p>
                        To <br /> {moment(new Date(hotel.to)).format("MMMM Do YYYY")}
                    </p>

                    


                    <i className='text-success'>Posted By {hotel.postedBy && hotel.postedBy.name.toUpperCase()}</i>
                    
                    <br />

                
                    <button onClick={handleClick} className='btn btn-block btn-lg btn-primary mt-3 ' disabled={loading || alreadyBooked} >
                        {loading ? "Loading..." : alreadyBooked ? "Already Booked" : auth && auth.token ? "Book Now" : "Login to Book"}
                    </button>
                </div>
            </div>
        </div>

        
    </>
  )
}

export default ViewHotel