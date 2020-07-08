import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debit from './components/Debit';
import Credit from './components/Credit';

import './css/App.css'

class App extends Component{
  constructor(){
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '09/23/99',
      },

      debitData: [],
      creditData: [],
      debitTotal: 0,
      creditTotal: 0,
    }

    this.getData = this.getData.bind(this);
    
  }


  //Calculates total amounts
  calculateTotal = (amounts) => {
    let a = amounts.map(item => parseFloat(item.amount));
    let total = a.reduce((acc,now) => {
      acc += now;
      return acc;
    }, 0)
    
    return total;
  }

  
  //Calculates account balance
  calculateBalance= () => {
    let balance = (this.state.creditTotal - this.state.debitTotal).toFixed(2);
    this.setState({accountBalance: balance})
    
  }

  //Updates debitData
  updateDebit = (ob) => {
    const data = [...this.state.debitData]
    data.push(ob);
    let total = this.calculateTotal(data);
    this.setState({ debitData: data, debitTotal: total }, function() {this.calculateBalance();})
    
  }


  //Updates creditData
  updateCredit = (ob) => {
    const data = [...this.state.creditData]
    data.push(ob);
    let total = this.calculateTotal(data);
    this.setState({ creditData: data, creditTotal: total }, function() {this.calculateBalance();})
    
  }

  //Recieves info from api and sets states to appropriate values
  async getData(){
    try{
      let debit = await axios.get("https://moj-api.herokuapp.com/debits");
      let credit = await axios.get("https://moj-api.herokuapp.com/credits");
      let c = this.calculateTotal(credit.data);
      let d = this.calculateTotal(debit.data);

      this.setState({
        creditData: credit.data, 
        debitData: debit.data,
        creditTotal: c,
        debitTotal: d,
        accountBalance: (c - d).toFixed(2),
      });
    }
    catch(error){
      console.log("Unable to get information")
    }
  }

  //Changes username after login
  mockLogIn = (logInInfo) => {
    
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }


  componentDidMount(){
    this.getData();
    
  }
  


  render(){
    
    //References to components generated in order to pass props
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>
    );
    const DebitComponent = () => (
      <Debit debitData={this.state.debitData} accountBalance={this.state.accountBalance} updateDebit={this.updateDebit} setTotal={this.setTotal} calculateBalance={this.calculateBalance}/>
    );

    const CreditComponent = () => (
      <Credit creditData={this.state.creditData} accountBalance={this.state.accountBalance} updateCredit={this.updateCredit} setTotal={this.setTotal} calculateBalance={this.calculateBalance}/>
    );

    return(
      //All components are routed here
      <Router>
        <Switch>
          <Route exact path='/bank-of-react' render={HomeComponent}/>
          <Route exact path='/userProfile' render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/Debit" render={DebitComponent}/>
          <Route exact path="/Credit" render={CreditComponent}/>
        </Switch>
      </Router>
      
    );
  }
  
}

export default App;
