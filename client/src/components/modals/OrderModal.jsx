import { Modal } from 'antd';
import React from 'react';

const OrderModal = ({session, orderedBy, showModal, setShowModal}) => {
  return (
   <Modal title='Payment information' visible={showModal} onCancel={() =>setShowModal(!showModal)}  footer={null} >
    

    <p>Payment Intent: {session.payment_intent}</p>
    <p>Payment Status:{session.payment_status === 'paid' ? <b className='text-success' > {session.payment_status.toUpperCase()}</b>:<b className='text-danger'>{session.payment_status.toUpperCase()}</b>}  </p>
    <p>Payment Subtotal: {session.currency.toUpperCase()}{" "}{session.amount_subtotal / 100}</p>
    <p>Discount: {session.currency.toUpperCase()}{" "}{session.total_details.amount_discount / 100 }</p>
    <p>Stripe customer id: {session.customer}</p>
    <p>Customer Name: {orderedBy.name.toUpperCase()}</p>
    <p>Customer Id: {orderedBy._id.toUpperCase()}</p>
   </Modal>
  )

}

export default OrderModal 