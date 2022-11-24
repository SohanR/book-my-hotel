import React, { useEffect, useState } from 'react';
import { searchListings } from '../actions/hotel';
import Search from '../components/forms/Search';
import SmallCard from './../components/cards/SmallCard';
const SearchResult = () => {

    const [searchLocation, setSearchLocation] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchBed, setSearchBed] = useState('');
    const [hotels, setHotels] = useState([]);

    useEffect(() =>{
        const queryParams = new URLSearchParams(window.location.search)
        const location =  queryParams.get('location')
        const date =  queryParams.get('date')
        const bed =  queryParams.get('bed')
        searchListings({location, date,bed}).then(res=>{
            //console.log("search result", res.data);
            setHotels(res.data)
        })
    },[window.location.search])



  return (

    <>
       <div className='col'>
        <br />
        <Search/>

      </div>

     <div className='container-fluid p-5 text-center' >
        <h1>Search Result</h1>
    </div>
    <div>
        {
            hotels.map(h => <SmallCard key={h._id} h={h} />)                    
        
        }
    </div>
  
    </>

  )
   
}

export default SearchResult