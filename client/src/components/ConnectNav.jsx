/*
    -create another nav for stripe connect marchant => stripe marchant
    -this is where you will show their balance
    -and access to stripe dashboard (payput setting)
*/


import { Avatar, Card } from 'antd';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';


const {Meta} = Card;

const ConnectNav = () => {

  const {auth} = useSelector((state) => state )
  const {user} = auth;
  return (
    <div className='d-flex justify-content-between' >
      <Card>
        <Meta avatar={<Avatar shape='circle'  style={{ backgroundColor: 'orange', verticalAlign: 'middle' ,}}> {user.name[0]}</Avatar>} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`} />
      </Card>
    </div>
  )
}

export default ConnectNav