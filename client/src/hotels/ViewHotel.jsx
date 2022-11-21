import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { diffDays, read } from '../actions/hotel';

const ViewHotel = () => {

    const {auth} = useSelector((state) => state )
    

    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState("");

    const {hotelId} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        loadHotel()
    }, []);


    const loadHotel = async () =>{
        let res = await read(hotelId)

        setHotel(res.data)
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)

    }

    const handleClick = (e) =>{
        e.preventDefault();

        if(!auth){
            navigate("/login")
        }
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

                    <img src={image} alt={hotel.title} className="img img-fluid m-2" />
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

                
                    <button onClick={handleClick} className='btn btn-block btn-lg btn-primary mt-3 ' >
                        {auth && auth.token ? "Book Now" : "Login to Book"}
                    </button>
                </div>
            </div>
        </div>

        
    </>
  )
}

export default ViewHotel