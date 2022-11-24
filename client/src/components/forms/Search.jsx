import { SearchOutlined } from '@ant-design/icons'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const {RangePicker} = DatePicker
    const {Option} = Select
    const navigate = useNavigate();

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [bed, setBed] = useState('');


      
    const handelSubmit = () =>{
        navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    }

  return (


    <div className='d-flex pb-4 '>
        <div className='w-100'>
        <input type="text" name="location"  value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' className='form-control m-2' style={{height:'50px'}} />
        </div>

        <RangePicker className='w-100' onChange={(value,dateString) => setDate(dateString)} disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days') } style={{height:'50px',marginTop:'8px'}}/>

        <Select onChange={(value) => setBed(value)} className='w-100' size='large' placeholder='Number of beds' style={{height:'50px',marginTop:'8px'}}>
            <Option key={1} >{1}</Option>
            <Option key={2} >{2}</Option>
            <Option key={3} >{3}</Option>
            <Option key={4} >{4}</Option>
        </Select>

        <SearchOutlined onClick={handelSubmit} className='btn btn-primary p-3 btn-square' />
    </div>
  )
}

export default Search