import React, { Component } from 'react';
import './App.css';
import DropDown from './DropDown';

const options = ['BTC', 'ETH', 'EUR', 'USD', 'ZEC'];

const Header = (
  <div className="App-header">
    {/*<img src={logo} className="App-logo" alt="logo" />*/}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOne: '',
      currencyTwo: '',
      amount: '',
      convertedAmount: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event, name) {
    this.setState({[name]: event.target.value});
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
    return (
      <div className="App">
        {Header}
        <form onSubmit={this.handleSubmit}>
          <DropDown options={options}
          name='currencyOne' 
          handleChange={this.handleChange}/>
          <DropDown options={options} 
          name='currencyTwo' 
          handleChange={this.handleChange}/>
          <input type="text" name='amount' 
          onChange={(e) => this.handleChange(e,e.target.name)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
