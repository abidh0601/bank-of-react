import React, {Component} from 'react';

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