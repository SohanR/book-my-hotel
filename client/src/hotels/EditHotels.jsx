import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { read } from '../actions/hotel';


//const {Option} = Select;


const EditHotels = () => {

    const {hotelId} = useParams()
    useEffect(() =>{
        loadSellerHotel()
    },[])

    const loadSellerHotel = async () =>{
        let res = await read(hotelId)

        console.log(res);
    }
  return (
    <>
        <div className='container-fluid bg-secondary p-5 text-center' >
            <h2>Edit Hotel</h2>
        </div>    
    </>
  )
}

export default EditHotels