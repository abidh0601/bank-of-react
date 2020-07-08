import React, {Component} from 'react';

//Component that displays account balance
class AccountBalance extends Component{
    render(){
        return(
            <div className="Account_Balance">
                Account Balance: {this.props.accountBalance}
            </div>
        );
    }
}

export default AccountBalance;