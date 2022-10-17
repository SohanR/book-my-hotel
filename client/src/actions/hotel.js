import axios from "axios";

//for creating hotels
export const createHotel = async (token, data) => await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers:{
        Authorization: `Bearer ${token}`
    }
})


// for getting the hotels data
export const allHotels = async () => await axios.get(`${process.env.REACT_APP_API}/hotels`);  