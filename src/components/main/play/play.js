import React from 'react';
import './play.css';
import axios from 'axios';

import TitleAndName from './playComponents/titleAndName/titleAndName';
import Scenario from './playComponents/scenario/scenario.1';

class PlayComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            adventureID: '',
            curZID: 'z',
            z_type: 'default',
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
            axios.get(`/api/allplayinfo/${this.state.adventureID.adventure_id}`).then(
                res=>{
                    console.log(res.data)
                    this.setState(
                        {dataObject: res.data}
                    )
                }
            )
            
            axios.get(`/playinfo/${this.state.adventureID.adventure_id}`).then(
                res=>{
                    // console.log('does it work here')
                    this.setState({
                        title: res.data.adventure_title,
                        user: res.data.username
                    })
                }
            )
        }
    }
    render(){
        // console.log(this.state.adventureID)
        // this.getPlayInfo()
        return (
            <div className='main_play_two'>
                <TitleAndName title={this.state.title} user={this.state.user}/>                 
                <Scenario id={this.state.adventureID} 
                    dataObject={this.state.dataObject}
                />
                {/* character sheet component */}
            </div>
        )
    };
};

export default PlayComponents;