import React from 'react';
import {connect} from 'react-redux';
import './mainScreen.css';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import BuildComponent from '../../components/main/build/build';
import TreeDashboard from '../../components/main/build/treeDashboard';
import SelectedDashboard from '../../components/main/build/selectedDashboard';

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
                <div className='side'>
                    <Sidebar />
                </div>
                <div className='main_build'>
                    <BuildComponent />
                    <TreeDashboard />
                    <SelectedDashboard />
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