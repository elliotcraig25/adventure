import React from 'react';
import './navGraphic.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class NavGraphic extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };
    render(){
        return ( 
            <div className='navGraphic'>
                <div className='box'>
                
                </div>
                <div className='links'>
                    <Link to='/'>
                        <div className='choose'>
                            Choose your own adventure
                        </div>
                    </Link>
                    <Link to={this.props.user_id ? '/build' : '/'}>     {/* /play needs to be changed once i've build a login screen */}
                        <div className='make'>
                            Make your own adventure
                        </div>
                    </Link>
                </div>
            </div>
        )
    };
};
const mapToProps = reduxState => {
    return {
        user_id: reduxState.user_id
    }
};
export default connect(mapToProps, null)(NavGraphic);