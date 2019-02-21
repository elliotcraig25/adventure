import React from 'react';
import './play.css';
import axios from 'axios';

import TitleAndName from './playComponents/titleAndName/titleAndName';
import Scenario from './playComponents/scenario/scenario';

class PlayComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            adventureID: '',
            curZID: 'z',
            title: '',
            user: ''
        };
    };
    componentDidMount(){
        this.setState({
            adventureID: this.props.adventureID
        }, ()=>this.getPlayInfo());
        
    }
    getPlayInfo = ()=>{
        if(this.state.adventureID){            
            axios.get(`/playinfo/${this.state.adventureID.adventure_id}`) 
            .then(res=>{this.setState({
                title: res.data.adventure_title,
                user: res.data.username
            })})
        }     
    }
    render(){
        // console.log(this.state.adventureID)
        // this.getPlayInfo()
        return (
            <div className='main_play_two'>
                <TitleAndName title={this.state.title} user={this.state.user}/>                 
                <Scenario id={this.state.adventureID}/> 
                {/* character sheet component */}
            </div>
        )
    };
};

export default PlayComponents;