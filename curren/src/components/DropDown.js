import React from 'react';
import Dropdown from 'react-dropdown'
import './DropDown.css'
function DropDown({ options, handleChange, name, currency, title }) {
  return (
    <div className='DropBox'>
      <h3>{title}</h3>
      <Dropdown 
        className='SelectStyle'
        options={options} 
        onChange={(e) => {
          handleChange(e, name)
        }} 
        value={currency} 
        placeholder='Select' 
      />
    </div>
  );
}

export default DropDown;