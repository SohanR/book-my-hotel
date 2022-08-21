import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInLocalStorage } from '../actions/auth';
import { getAccountStatus } from '../actions/stripe';

const StripeCallback = ({history}) => {
  
  const {auth} = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(auth && auth.token){
      accountStatus()
    }

  },[auth])


  const accountStatus = async () =>{
    try{
      const res = await getAccountStatus(auth.token)
      // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK ",res);

      // update user in local storage
      updateUserInLocalStorage(res.data, ()=>{
        // update redux
        dispatch({
          type:"LOGGED_IN_USER",
          payload:res.data
        });

        // redirect user to dashboard page
        window.location.href = "/dashboard/seller"
      })
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="d-flex justify-content-center p-5" >
        <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  )
}

export default StripeCallback