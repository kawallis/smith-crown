import React, { Component } from 'react';
import './App.css';
import DropDown from './components/DropDown';
import PopUp from './components/PopUp';

const options = ['BTC', 'ETH', 'EUR', 'USD', 'ZEC'];

const Header = (
  <div className="App-header">
    <h1>Currency Converter</h1>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOne: null,
      currencyTwo: null,
      amount: '',
      convertedAmount: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event, name) {
    if(name === 'amount') {
      if(isNaN(event.target.value)){
       event.target.value = '';
      }
      event.target.border = 'none';
      this.setState({[name]: event.target.value});
    }else {
      this.setState({[name]: event.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let {currencyOne, currencyTwo, amount} = this.state;
    fetch('https://citadel-miner.appspot.com/data/v1/converter?set=devtest')
    .then(res => res.json())
    .then(res => {
      let value = res[currencyOne].quotes[`${currencyOne+ currencyTwo}`];
      this.setState({convertedAmount: value*amount})
    })
  }

  render() {
    let slots = null;
    let newColor = 'rgb(170,170,170)';
    let {currencyOne, currencyTwo, convertedAmount, amount} = this.state;
    if(amount !== ''&& currencyTwo && currencyOne) newColor = 'rgb(86, 116,190)';
    if (convertedAmount) {
      slots = <PopUp message={this.state}/>
      
    } else {
      slots = null;
    }
    return (
      <div className="App">
        {Header}
        <form onSubmit={this.handleSubmit}>
          <div className='DropContainer'>
            <DropDown options={options}
            title={'FROM'}
            name='currencyOne'
            currency={this.state.currencyOne} 
            handleChange={this.handleChange}/>
            <DropDown options={options} 
            title={'TO'}
            name='currencyTwo'
            currency={this.state.currencyTwo}  
            handleChange={this.handleChange}/>
          </div>
          <h3>AMOUNT</h3>
          <input type="text" name='amount' className='fieldBox'
          onChange={(e) => this.handleChange(e,e.target.name)} />
          <input style={{backgroundColor: newColor}}className='convertButton' type="submit" value="CONVERT" />
        </form>
        {slots}
      </div>
    );
  }
}

export default App;
