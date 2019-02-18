import React from 'react';
import {connect} from 'react-redux';
import './mainScreen.css';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import BuildComponent from '../../components/main/build/build';

class BuildInterface extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };
    componentDidMount(){
        if(!this.props.user_id){
            this.props.history.push('/');
        }
    }
    check = ()=>{
        if(!this.props.user_id){
            this.props.history.push('/');
        }
        console.log('checked')
    }
    render(){
        this.check()
        return (
            <div className='head-side-main'>
                <div className='head'>
                    <Header />
                </div>
                <div className='side-main'>
                    <div className='side'>
                        <Sidebar />
                    </div>
                    <div className='main'>
                        <BuildComponent />
                    </div>
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
export default connect(mapToProps, null)(BuildInterface);