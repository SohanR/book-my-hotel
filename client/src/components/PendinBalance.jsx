import { Badge, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { currencyFormatter, getAccountBalance } from '../actions/stripe';

const {Ribbon} = Badge;


const PendinBalance = ({token}) => {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(token).then(res =>{
      console.log(res);
      setBalance(res.data)
    })    
   
  }, []);


  return (
    <Ribbon text="Available" color='gray'>
    <Card className="bg-light pt-1 ">
      {balance && balance.pending && balance.pending.map((ba, i)=>(
        <span key={i} className="lead" >
          {currencyFormatter(ba)}
        </span>
      )) }
    </Card>
  </Ribbon>
  )
}

export default PendinBalance