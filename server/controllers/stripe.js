export const createConnectAccount = async (req, res) =>{
    console.log("REQ USER FROM REQUIRE_SINGIN MIDDLEWARE",  req.auth); //  we can get headers by req.headers
    console.log("you hit create connect account endpoind");
} 