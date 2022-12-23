import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import Hotels from "./booking/Hotels";
import Footer from "./components/Footer";
import Offer from "./components/Offer";
import PrivateRoute from "./components/PrivateRoute";
import Testimonial from "./components/Testimonial";
import TopNav from "./components/TopNav";
import Tours from "./components/Tours";
import EditHotels from "./hotels/EditHotels";
import NewHotel from "./hotels/NewHotel";
import SearchResult from "./hotels/SearchResult";
import ViewHotel from "./hotels/ViewHotel";
import StripeCallback from "./stripe/StripeCallback";
import StripeCancel from "./stripe/StripeCancel";
import StripeSuccess from "./stripe/StripeSuccess";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";


function App() {
  return (
    <BrowserRouter>
    <TopNav/>
    <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/hotels" element={<Hotels/>} />
        <Route exact path="/offer" element={<Offer />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/tour" element={<Tours />} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/hotel/:hotelId" element={<ViewHotel/>} />
        <Route exact path="/search-result" element={<SearchResult/>} />
        <Route path="/*" element={<PrivateRoute/>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="dashboard/Seller" element={<DashboardSeller/>} />
          <Route path="hotels/new" element={<NewHotel/>} />
          <Route path="hotel/edit/:hotelId" element={<EditHotels/>} />
          <Route path="stripe/callback" element={<StripeCallback/>} />
          <Route path="stripe/success/:hotelId" element={<StripeSuccess/>} />
          <Route path="stripe/cancel" element={<StripeCancel/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    
    
  );
}

export default App;
