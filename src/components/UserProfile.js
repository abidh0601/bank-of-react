import React, {Component} from  'react';


import NavBar from './NavBar';

class UserProfile extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <h1>
                    User Profile
                </h1>
                <div>
                    Username: {this.props.userName}
                </div>
                <div>
                    Member Since: {this.props.memberSince}
                </div>
            </div>
        );
    }
}

export default UserProfile;