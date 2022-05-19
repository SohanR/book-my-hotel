import axios from "axios";


// for registration
export const register = async (user ) => await axios.post(`${process.env.REACT_APP_API}/register`, user); 


// for log in
export const login = async (user ) => await axios.post(`${process.env.REACT_APP_API}/login`, user); 