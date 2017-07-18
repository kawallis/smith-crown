import React from 'react';

function DropDown({ options, handleChange, name }) {
  return (
    <select onChange={(e) => {handleChange(e,name)}} >
        <option defaultValue>select</option>
        {options.map((opt, i) => {
            return <option key={i} value={opt}>{opt}</option>
        })}
    </select>
  );
}

export default DropDown;