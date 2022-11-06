import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { diffDays } from '../../actions/hotel'
import { currencyFormatter } from '../../actions/stripe'
import HotelImage from '../HotelImage'

const SmallCard = ({h, handleHotelDelete = (f) => f, owner = false, showViewMoreButton = true}) => {

  const navigate = useNavigate()

  return (
    <>
        <div className='card mb-3' > {console.log(h.title)}
            <div className='row no-gutter'>
                <div className='col-md-4'>
                <HotelImage h={h} />
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
                    <p className="card-text">
                      <span className='float-right text-primary' >
                         for {diffDays(h.from, h.to)}
                         {diffDays(h.from, h.to) <= 1 ? ' Day' : ' Days' }
                      </span>
                    </p>
                    <p className="card-text">{h.bed} Bed</p>
                    <p className="card-text">
                      Available from {new Date(h.from).toLocaleDateString()}
                    </p>

                    {/* conditional buttton */}
                    <div className='d-flex justify-content-between h4' >
                      {
                        showViewMoreButton && (
                          <button className='btn btn-info' onClick={()=> navigate(`hotel/${h._id}`)} >
                            Show more
                          </button>
                        )
                      }
                    {
                      owner && (
                        <>
                        <Link to={`hotel/edit/${h._id}`} >
                          <EditOutlined className='text-warning' />
                        </Link>
                        <div>
                          <DeleteOutlined className='text-danger' onClick={()=>handleHotelDelete(h._id)} />
                        </div>
                        </>
                      )
                    }
                    </div>

                  </div>                    
                </div>
            </div>
        </div>
    </>
  )
}

export default SmallCard