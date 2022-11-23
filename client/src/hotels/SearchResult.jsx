import React, { useEffect, useState } from 'react';
import { searchListings } from '../actions/hotel';

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
            console.log("search result", res.data);
            setHotels(res.data)
        })
    },[window.location.search])



  return (
    <div><pre>{JSON.stringify(hotels,null,4)}</pre></div>
  )
}

export default SearchResult