import React from 'react'
import { currencyFormatter } from '../../actions/stripe'

const SmallCard = ({h}) => {
  return (
    <>
        <div className='card mb-3' > {console.log(h.title)}
            <div className='row no-gutter'>
                <div className='col-md-4'>
                    <img className='card-image img img-fluid' src="https://via.placeholder.com/900x500/?text=Book+My+Hotel" alt="hotel" />
                </div>

                <div className='col-md-8'>
                  <div className="card-body">
                    <h3 className='card-title' >
                     {h.title} {" "}
                     <span className='float-right text-primary' >
                      {currencyFormatter({
                        amount:h.price,
                        currency:"bdt"
                      })}
                     </span> {" "}
                    </h3>
                    <p className='alert alert-info' >{h.location}</p>
                    <p className='card-text' >{`${h.content.substring(1, 200)}...`}</p>
                  </div>                    
                </div>
            </div>
        </div>
    </>
  )
}

export default SmallCard