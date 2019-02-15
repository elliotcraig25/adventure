import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from './../../../../ducks/reducer';

class UserComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }
    componentDidMount(){
        const {id} = this.props;
        if(id){
            this.setState({
                loggedIn: true,
            })
        }
        // else{
        //     axios.get('/api/user')
        //     .then(res=>{

        //     })
        // }
    }
    handleChange(prop, val){
        this.setState({
            [prop]: val
        });
    };
    render(){
        console.log(this.state.username)
        console.log(this.state.password)
        const {username, password} = this.state; 
        return (
            <div>
                {
                    this.state.loggedIn ? (
                        <p>
                            {this.props.username}
                        </p>
                    ):(
                        <div>
                            <input 
                                type='text'
                                value={username}                    // putting value here lets state influence username instead of just username being able to influence username
                            onChange={(e)=>{
                                this.handleChange(
                                    'username', e.target.value
                                );
                            }}
                            />
                            <input 
                                type='password'
                                value={password}
                                onChange={(e)=>{
                                    this.handleChange(
                                        'password', e.target.value
                                    );
                                }}
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapToProps = reduxState => {                      // State aka data
    return {
        id: reduxState.id,
        username: reduxState.username,
        profile_pic: reduxState.profile_pic
    }
};
const dispatch = {                                      // Methods aka actions
    updateUser
};
export default connect(mapToProps, dispatch)(UserComponent);