import React from 'react';
import './mainScreen.css';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import ViewComponent from '../../components/main/view/view';

class ViewInterface extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };
    render(){
        return (
            <div className='head-side-main'>
                <div className='head'>
                    <Header />
                </div>
                <div className='side'>
                    <Sidebar />
                </div>
                <div className='main_view'>
                    <ViewComponent />
                </div>                
            </div>
        )
    };
};

export default ViewInterface;