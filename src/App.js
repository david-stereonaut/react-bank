import './App.css';
import { Component } from 'react';
import Transactions from './Components/Transactions';
import Operations from './Components/Operations';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Breakdown from './Components/Breakdown';
import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Navbar from './Components/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e9c46a'
    },
    secondary: {
      main: "#2a9d8f"
    }
  }
})

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      balance: 0,
      err: false
    }
  }

  handleData = data => {
    if (data.data === 'error') {
      console.log('error')
    } else {
      this.setState({
        data: data.data,
        balance: this.getBalance(data.data)
      })
    }
  }

  async componentDidMount() {
    const data = await axios.get('http://localhost:3000/transactions')
    this.handleData(data)
  }

  deleteTransaction = async id => {
    const data = await axios.delete('http://localhost:3000/transaction', { data: { id } })
    this.handleData(data)
  }

  deposit = async transaction => {
    transaction.amount = Math.abs(transaction.amount)
    const data = await axios.post('http://localhost:3000/transaction', transaction)
    this.handleData(data)
  }

  withdraw = async transaction => {
    transaction.amount = -Math.abs(transaction.amount)
    const data = await axios.post('http://localhost:3000/transaction', transaction)
    this.handleData(data)
  }

  getBalance = data => {
    return data.reduce(function (accumulator, transaction) {
      return accumulator + transaction.amount
    }, 0)
  }

  render() {
    const balanceColor = this.state.balance >= 500 ? 'green' : 'red'
    return (
      <Router>
        <ThemeProvider theme={theme}>
        <div className="App">
        <Navbar balance={this.state.balance} />
        <Route exact path="/">
          <Redirect to="/transactions" />
        </Route>
        <Route exact path="/transactions" render={() => <Transactions data={this.state.data} deleteTransaction={this.deleteTransaction} />} />
        <Route exact path="/operations" render={() => <Operations withdraw={this.withdraw} deposit={this.deposit} balance={this.state.balance} />} />
        <Route exact path="/breakdown" render={() => <Breakdown data={this.state.data} />} />
        </div>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App;
