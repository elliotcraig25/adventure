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
            loggedIn: false,
            loggingIn: false,
            registering: false
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
    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.user_id !== this.props.user_id){
    //         this.setState({loggedIn: true})
    //     }
    // };
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
            // console.log(res.data)
            this.props.updateUser(res.data.user);  
            this.setState({loggedIn: true})        
        }).catch(err=>{
            console.log(err);
        }); 
    };
    logout = ()=>{
        axios.post('/auth/logout')
        .then(res=>{
            this.props.updateUser({});
            this.setState({loggingIn: false, loggedIn: false, registering: false})
        }).catch(err=>{
            console.log(err);
        });
        // this.props.history.push('/'); 
    };
    handleClickLogin = ()=>{
        this.setState({loggingIn: true, loggedIn: false, registering: false})
    }
    handleClickRegister = ()=>{
        this.setState({loggingIn: false, loggedIn: false, registering: true})
    }
    handleClickCancel = ()=>{
        this.setState({loggingIn: false, loggedIn: false, registering: false})
    }
    notLoggedIn = ()=>{
        return (
            <div className='user_component_child'>
                <div className='profile_pic_boarder_top'></div>
                <div className='profile_pic_boarder_bottom'></div>
                <div className='user_boarder_bottom'></div>
                <div className='profile_pic'>
                    profile pic
                </div>
                <div className='name_place'>Guest</div>
                <div className='loggin_register_one'>
                    
                    <button onClick={this.handleClickLogin}>
                        Login
                    </button>
                    <button onClick={this.handleClickRegister}>
                        Register
                    </button> 
                </div>
            </div>
        )
    };
    loggingIn = ()=>{
        const {username, password} = this.state;
        return (
            <div className='user_component_child_logging_in'>
                <div className='registering_border_top'></div>
                <div className='registering_border_bottom'></div>
                <div className='profile_pic_three'></div>
                <input 
                    className='loggin_in_input_one'
                    type='text'
                    value={username}
                onChange={(e)=>{
                    this.handleChange(
                        'username', e.target.value
                    );
                }}
                />
                <input 
                    className='loggin_in_input_two'
                    type='password'
                    value={password}
                    onChange={(e)=>{
                        this.handleChange(
                            'password', e.target.value
                        );
                    }}
                />
                <button className='login_button_on_logging_in' onClick={this.login}>Login</button>
                <button className='register_button_on_logging_in' onClick={this.handleClickRegister}>Register</button>
                <button className='cancel_button_on_logging_in' onClick={this.handleClickCancel}>Cancel</button>
            </div>
        )
    }
    registering = ()=>{
        const {username, password} = this.state;
        return (            
            <div className='user_component_child_registering'>
                <div className='registering_border_top'></div>
                <div className='registering_border_bottom'></div>
                <div className='profile_pic_two'>
                    Drag
                </div>
                <input 
                    className='registering_input_one'
                    type='text'
                    value={username}
                onChange={(e)=>{
                    this.handleChange(
                        'username', e.target.value
                    );
                }}
                />
                <input 
                    className='registering_input_two'
                    type='password'
                    value={password}
                    onChange={(e)=>{
                        this.handleChange(
                            'password', e.target.value
                        );
                    }}
                />
                <input 
                    className='registering_input_three'
                    type='password'
                    value={password}
                />
                <button className='register_button_on_registering' onClick={this.register}>Register</button>
                <button className='login_button_on_registering' onClick={this.handleClickLogin}>Login</button>
                <button className='cancel_button_on_registering' onClick={this.handleClickCancel}>Cancel</button>
            </div>
            
        )
    }
    loggedIn = ()=>{
        return (            
            // <div className='user_component_child'>
            //     <div className='profile_pic_boarder'></div>
            //     <div>
            //         profile pic
            //     </div>                       
            //     <div>
            //         {this.props.username}
            //     </div>
            //     <button onClick={this.logout}>
            //         Logout
            //     </button> 
            // </div>
            <div className='user_component_child'>
                <div className='profile_pic_boarder_top'></div>
                <div className='profile_pic_boarder_bottom'></div>
                <div className='user_boarder_bottom'></div>
                <div className='profile_pic'>
                    profile pic
                </div>
                <div className='name_place'>{this.props.username}</div>
                <div className='loggin_register_one'>
                    <button onClick={this.logout}>
                        Logout
                    </button>
                </div>
            </div>
        )
    }
    whatToRender(){
        if(this.state.loggedIn){
            return this.loggedIn()
        }else if(!this.state.loggedIn && !this.state.loggingIn && !this.state.registering){
            return this.notLoggedIn()
        }else if(!this.state.loggedIn && this.state.loggingIn && !this.state.registering){
            return this.loggingIn()
        }else if(!this.state.loggedIn && !this.state.loggingIn && this.state.registering){
            return this.registering()
        }
    }
    render(){
        // console.log(this.state.username)
        // console.log(this.state.password)
        return (
            <div  className='user_component'>
                {this.whatToRender()}
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