import React, { useEffect, useState } from 'react';
import { allHotels } from '../actions/hotel';
import SmallCard from '../components/cards/SmallCard';
import Search from '../components/forms/Search';

const Hotels = () => {
  
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    loadAllHotels()
  }, []);



  const loadAllHotels =async () =>{
    let res = await allHotels();

    setHotel(res.data)
  }

  return (
    <>
      <div className='container-fluid p-5 text-center' >
        <h1>All Hotels</h1>
      </div>

      <div className='col'>
        <br />
        <Search/>

      </div>

      <div className='container-fluid'>
        {/* <pre>
          {JSON.stringify(hotel, null, 1)}
        </pre> */}

        {hotel.map((h) => <SmallCard key={h._id} h={h} />)}
      </div>    
    </>


  )
}

export default Hotels