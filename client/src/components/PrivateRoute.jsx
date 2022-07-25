// protected routes > post a new hotel for booking
// that is accessible only for logged in users 




import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



const PrivateRoute = () =>{
    const {auth} = useSelector((state) => state )

    return auth && auth.token ? <Outlet  /> : <Navigate to="/login" />
}

export default PrivateRoute;