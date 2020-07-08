import React, {Component} from 'react';

import Navbar from './NavBar';
import AccountBalance from './AccountBalance'


//Component that displays all debits
class Debit extends Component{
    constructor(){
        super();

        this.state = {
            item:{
                id: "",
                description: "",
                amount: "",
                date: "",
            },
        }
    }


    //Handles changes to description and amount on input
    handleChange = (e) => {
        const updateItem = {...this.state.item};
        const inputField = e.target.name;
        const inputValue = e.target.value;
        var date = new Date().toLocaleString();
        
        updateItem[inputField] = inputValue;
        updateItem.date = date;
        this.setState({item: updateItem});
        
    }


    //Passes new item object to App for addition to debitData
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateDebit(this.state.item);
       
    };

    render(){
        const rows =[];
        this.props.debitData.map((item, index) => {
            rows.push(
                <ul key={index}>
                    <li>
                        Description: {item.description}
                    </li>
                    <ul>
                        <li>
                            Amount: {item.amount}
                        </li>
                        <li>
                            Date: {item.date}
                        </li>
                    </ul>
                </ul>
            )
        });
        

        return(
            <div className="Transactions">
                <Navbar/>
                <h1>
                    Debits
                </h1>
                {rows}
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.item.Description} />
                </div>
                <div>
                    <label htmlFor="amount">Amount: </label>
                    <input type="number" name="amount" onChange={this.handleChange} value={this.state.item.Amount} />
                </div>
                <button>Add Debit</button>
                </form>
            </div>
        );
    }

}

export default Debit;