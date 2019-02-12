import React from 'react';
import './navGraphic.css';
import {Link} from 'react-router-dom';

class NavGraphic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logedin: false
        };
    };
    render(){
        return (
            <div className='navGraphic'>
                <div className='box'>
                    little box
                </div>
                <div className='links'>
                    <Link to={this.state.logedin ? '/build' : '/play'}>     {/* /play needs to be changed once i've build a login screen */}
                        <div className='make'>
                            Make your own adventure
                        </div>
                    </Link>
                    <Link to='/'>
                        <div className='choose'>
                            Choose your own adventure
                        </div>
                    </Link>
                </div>
            </div>
        )
    };
};

export default NavGraphic;