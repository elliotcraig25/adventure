import React from 'react';
import './play.css';
import axios from 'axios';

import TitleAndName from './playComponents/titleAndName/titleAndName';
import Scenario from './playComponents/scenario/scenario.2';
import { connect } from 'react-redux';
import {updateAllData} from '../../../ducks/reducer';

class PlayComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            adventureID: '',
            curZID: 'z',
            z_type: 'default',
            title: '',
            user: '',
            dataObject: undefined
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
                    let theData = res.data
                    console.log('this is the res data', theData)
                    this.props.updateAllData({data: theData})
                    console.log('xyz', res.data)
                    this.setState(
                        {dataObject: res.data},
                        // title: res.data.adventure_title
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
        console.log('here is state in play', this.state)
        // if(this.state.title){
            return (
                <div className='main_play_two'>
                    
                    <TitleAndName title={this.state.title} user={this.state.user}/>                 
                    <Scenario id={this.state.adventureID} 
                        dataObject={this.state.dataObject}
                    />
                    {/* character sheet component */}
                </div>
            )
        // }else{
        //     return (
        //         <div>Hello</div>
        //     )
        // }
    };
};

const dispatch = {
    updateAllData
};

export default connect(null, dispatch)(PlayComponents);