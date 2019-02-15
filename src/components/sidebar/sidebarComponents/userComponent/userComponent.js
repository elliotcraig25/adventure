import React from 'react';

class UserComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    render(){
        return (
            <div>
                Guest
            </div>
        )
    }
}

export default UserComponent;