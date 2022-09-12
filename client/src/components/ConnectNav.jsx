/*
    -create another nav for stripe connect marchant => stripe marchant
    -this is where you will show their balance
    -and access to stripe dashboard (payput setting)
*/


import React from 'react';
import { useSelector } from 'react-redux';
import PayoutSetting from './PayoutSetting';
import PendinBalance from './PendinBalance';
import UserCard from './UserCard';


const ConnectNav = () => {

  
  const {auth} = useSelector((state) => state )
  const {user} = auth;



  return (
    <div className='d-flex justify-content-around' >
      <UserCard name={user.name} createdAt={user.createdAt} />      
      {
        auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
        <>
          <PendinBalance token={auth.token} />

          <PayoutSetting token={auth.token} />
        </>

        )
      }
      
    </div>
  )
}

export default ConnectNav