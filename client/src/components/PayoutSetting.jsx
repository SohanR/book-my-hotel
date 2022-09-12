import { SettingOutlined } from '@ant-design/icons';
import { Badge, Card } from 'antd';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { payoutSetting } from '../actions/stripe';


const {Ribbon} = Badge;


const PayoutSetting = ({token}) => {

  const [loading, setLoading] = useState(false);

      // payou settings handler
  const handlePayoutSetting = async () =>{
    setLoading(true);

    try {
      const res = await payoutSetting(token)
      //console.log("payout settings response", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      console.log("payout settings error", error);
      setLoading(false);
      toast.error("Unable to access settings, try again")
    }
    
  }


  return (
    <Ribbon text='Payouts' color='silver' >
        <Card onClick={handlePayoutSetting} className='bg-light' style={{cursor:"pointer"}} >
            <SettingOutlined className='h5 pt-2' />
        </Card>
    </Ribbon>
  )
}

export default PayoutSetting