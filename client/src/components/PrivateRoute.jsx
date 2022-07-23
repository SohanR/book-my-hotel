// protected routes > post a new hotel for booking
// that is accessible only for logged in users 




import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



const PrivateRoute = ({...rest}) =>{
    const {auth} = useSelector((state) => ({...rest}));

    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />
}

export default PrivateRoute;