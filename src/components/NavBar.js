import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "../css/NavBar.css"


class Navbar extends Component{
    render(){
        return(
            <div className="nav-bar">
                <Link className="link" to='/bank-of-react'>Home</Link>
                <Link className="link" to="/userProfile">User Profile</Link>
                <Link className="link" to="/login">Login</Link>
                <Link className="link" to="/Debit">Debit</Link>
                <Link className="link" to="/Credit">Credit</Link>
            </div>
        );
    }
}

export default Navbar;