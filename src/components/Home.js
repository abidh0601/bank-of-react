import React, {Component} from 'react';


import AccountBalance from './AccountBalance';
import NavBar from './NavBar';


//Home component which displays balance
class Home extends Component{
    render(){
        return(
            <div className="Home">
                <NavBar/>
                <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt='bank'/>
                <h1>
                    Bank of React
                </h1>

                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Home;