import React from 'react';
import './mainScreen.css';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import PlayComponent from '../../components/main/play/play';

class PlayInterface extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };
    render(){
        // console.log(this.props.match.params);
        return (
            <div className='head-side-main'>
                <div className='head'>
                    <Header />
                </div>
                <div className='side-main'>
                    <div className='side'>
                        <Sidebar />
                    </div>
                    <div className='main_play'>
                        <PlayComponent adventureID={this.props.match.params}/>
                    </div>
                </div>
            </div>
        )
    };
};

export default PlayInterface;