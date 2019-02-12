import React from 'react';
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
    render(){
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

export default BuildInterface;