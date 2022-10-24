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