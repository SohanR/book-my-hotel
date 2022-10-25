import React from 'react'

const HotelImage = ({h}) => {
  return (
    <>
        {h.image && h.image.contentType ? (           
            <img className='card-image img img-fluid' src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`} alt="hotel" />        
        ) : (  
                   
            <img className='card-image img img-fluid' src="https://via.placeholder.com/900x500/?text=Book+My+Hotel" alt="hotel" />  
        )}
    </>
  )
}

export default HotelImage