import { DatePicker, Select } from 'antd';
import moment from 'moment';
import React from 'react';

const {Option} = Select;

const HotelForm = ({values, setValues, setPreview}) => {

  //destructuring values
  const {title,content,location,image,price,from,to,bed} = values;

      //event handler
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(values);

  }



  const handleChange = (e) =>{
    setValues({...values, [e.target.name] : e.target.value })
  }

  const handleImageChange = (e) =>{
    //console.log( e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({...values, image:e.target.files[0]})

  }


  return (
    <form onSubmit={handleSubmit} >
    <div className='form-group' >
      <label  className='btn btn-outline-secondary btn-block m-2 text-left'>
        Image
        <input type="file" name='image' onChange={handleImageChange} accept='image/*'  hidden/>
      </label>

      <input type="text" name="title" onChange={handleChange} placeholder='Title' className='form-control m-2' value={title} />

      <textarea type="text" name="content" onChange={handleChange} placeholder='Content' className='form-control m-2' value={content} />

      {/* <AlgoliaPlaces className='form-control ml-2 mr-2' placeholder='location' defaultValue={location} options={config} onChange={({suggestion}) => setValues({...values, location: suggestion.value}) } style={{height:"50px"}}
      /> */}

    <input type="text" name="location" onChange={handleChange} placeholder='Location' className='form-control m-2' value={location} />


      <input type="number" name="price" onChange={handleChange} placeholder='Price' className='form-control m-2' value={price} />

      {/* <input type="number" name="bed" onChange={handleChange} placeholder='Number of Beds' className='form-control m-2' value={bed} /> */}

      <Select onChange={(value) => setValues({...values, bed:value })} className='w-100 m-2' placeholder='Number of Beds' >
        <Option key={1} >1</Option>
        <Option key={2} >2</Option>
        <Option key={3} >3</Option>
        <Option key={4} >4</Option>

        
      </Select>

    </div>

    <DatePicker 
      format="DD/MM/YYYY"
      placeholder='From Date' 
      className='form-control m-2' 
      onChange={( date, dateString ) => 
        setValues({...values, from:dateString})}  
      disabledDate={(current) => 
        current && current.valueOf() < moment().subtract(1, 'days')}
      />

    <DatePicker 
      format="DD/MM/YYYY"
      placeholder='To Date' 
      className='form-control m-2' 
      onChange={( date, dateString ) => 
        setValues({...values, to:dateString})} 
      disabledDate={(current) => 
        current && current.valueOf() < moment().subtract(1, 'days')}
    />

    <button className='btn btn-outline-primary m-2' >Save</button>
  </form>
  )
}

export default HotelForm