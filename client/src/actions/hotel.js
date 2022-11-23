import axios from "axios";

//for creating hotels
export const createHotel = async (token, data) => await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers:{
        Authorization: `Bearer ${token}`
    }
})


// for getting the hotels data
export const allHotels = async () => await axios.get(`${process.env.REACT_APP_API}/hotels`);  


// for calculate dates
export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;

    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end)/day));

    return difference;
    
}

// for seller hotels data
export const sellerHotels = async (token) => await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers:{
        Authorization: `Bearer ${token}`
    }
});


// delete hotel
export const deleteHotel = async (token, hotelId) => await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
    headers :{
        Authorization : `Bearer ${token}`
    }
} )


// fetch single hotel
export const read = async (hotelId) => await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

// update hotel information
export const updateHotel = async (token, data, hotelId) => await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data,  {
    headers :{
        Authorization : `Bearer ${token}`
    }
} )

// get user hotel booking data
export const userHotelBookings = async (token) => await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings/`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
});