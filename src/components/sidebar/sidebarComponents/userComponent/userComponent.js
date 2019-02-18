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
        const {user_id} = this.props;
        if(user_id){
            this.setState({
                loggedIn: true,
            })
        }
        else{
            axios.get('/api/user')
            .then(res=>{
                this.props.updateUser(res.data);
                this.setState({
                    loggedIn: true,
                })
            }).catch(err=>{
                // don't move
            });
        }
    }
    handleChange(prop, val){
        this.setState({
            [prop]: val
        });
    };
    register = ()=>{
        const {username, password} = this.state;
        axios.post(
            `/auth/register`, {username, password}
        ).then(res=>{
            this.props.updateUser(res.data);
            this.setState({loggedIn: true});
        }).catch(err=>{
            console.log(err);
        });
    };
    login = ()=>{
        const {username, password} = this.state;   
        // console.log({username})
        axios.post(`/auth/login`, {username, password})
        .then(res=>{
            this.props.updateUser(res.data);
            this.setState({loggedIn: 'true'})
        }).catch(err=>{
            console.log(err);
        });
    };
    logout = ()=>{
        axios.post('/auth/logout')
        .then(res=>{
            this.props.updateUser({});
            this.setState({loggedIn: false})
        }).catch(err=>{
            console.log(err);
        });
        this.props.history.push('/'); 
    };
    render(){
        // console.log(this.state.username)
        // console.log(this.state.password)
        const {username, password} = this.state; 
        return (
            <div>
                {
                    this.state.loggedIn ? (
                        <div>                            
                            <p>
                                {this.props.username}
                            </p>
                            <button onClick={this.logout}>
                                Logout
                            </button> 
                        </div>
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
                            <button onClick={this.login}>
                                Login
                            </button>
                            <button onClick={this.register}>
                                Register
                            </button> 
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapToProps = reduxState => {
    return {
        user_id: reduxState.user_id,
        username: reduxState.username,
        profile_pic: reduxState.profile_pic,
        loggedIn: reduxState.loggedIn 
    }
};
const dispatch = {
    updateUser
};
export default connect(mapToProps, dispatch)(UserComponent);