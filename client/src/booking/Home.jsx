import React from 'react'
import Destination from '../components/Destination'
import DownloadApp from '../components/DownloadApp'
import Search from '../components/forms/Search'
import Main from '../components/Main'
import Offer from '../components/Offer'
import Service from '../components/Service'
import Testimonial from '../components/Testimonial'
import Tours from '../components/Tours'

const Home = () => {
  return (
    <>
     <Main/>
     <Search/>
     <Service/>
     <Destination/>
      <Offer />
      <Tours />
      <Testimonial />
      <DownloadApp />
    </>
  )
}

export default Home