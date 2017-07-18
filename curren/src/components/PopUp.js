import React from 'react';
import './PopUp.css';

function PopUp({ message }) {
  let {amount, currencyOne, currencyTwo, convertedAmount} = message;
  return (
    <div className='PopUp'>
      <p>{`${amount} ${currencyOne} = ${Math.ceil(convertedAmount* 100) / 100} ${currencyTwo}`}</p>
    </div>
  );
}

export default PopUp;