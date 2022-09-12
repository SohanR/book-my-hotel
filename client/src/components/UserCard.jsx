import { Avatar, Card } from 'antd';
import moment from 'moment';
import React from 'react';

const { Meta } = Card;

const UserCard = ({name, createdAt}) => {
  return (
    <Card>
        <Meta avatar={<Avatar shape='circle'  style={{ backgroundColor: 'orange', verticalAlign: 'middle' ,}}> {name[0]}</Avatar>} title={name} description={`Joined ${moment(createdAt).fromNow()}`} />
    </Card>
  )
}

export default UserCard