import React from 'react';
import './build.css';
import axios from 'axios';
import {connect} from 'react-redux';

class BuildComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedZID: 'za',
            adventureTitle: '',
            adventure_id: 0,
        };
    };
    componentDidMount(){
        // console.log(this.props.user_id)
        let userMakingTheAdventure = this.props.user_id
        axios.post(`/api/createadventure`, {userMakingTheAdventure})
        .then((res)=>{
            console.log(res.data.adventure_id)
            this.setState({adventure_id: res.data.adventure_id})
        })
    }
    setSelectedA = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'a'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedB = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'b'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedC = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'c'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedD = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'd'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedAFromNext = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0) + 'a'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBFromNext = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0) + 'b'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedCFromNext = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0) + 'c'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedDFromNext = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0) + 'd'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedAFromPrev = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'a'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBFromPrev = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'b'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedCFromPrev = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'c'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedDFromPrev = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'd'
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBackOne = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1)
        this.setState({selectedZID: newSelectedZID})
    }
    handleChange = (prop, val)=>{
        this.setState({
            [prop]: val
        })
    }
    sendToDatabase = (prop, val)=>{
        const aID = this.state.adventure_id
        axios.post(`/api/buildinfotodatabase`, {prop, val, aID})
    }
    createNewRow(prop, val){
        const aID = this.state.adventure_id
        let newZID = `${this.state.selectedZID}`
        // console.log(`here it is agin`, newZID)
        axios.post(`/api/create_new_row`, {newZID, aID})
        .then(()=>{
            this.sendToDatabase(prop, val)
        }) 
    }
    addOrUpdate(prop, val){
        let movingTo = this.state.selectedZID        
        const aID = this.state.adventure_id;
        axios.post(`/api/does_z_id_exist`, {movingTo, aID})
        .then(response=>{
            // console.log(response.data[0])
            if(response.data[0]){
                this.sendToDatabase(prop, val)
            }else{                
                this.createNewRow(prop, val)
                // console.log(response.data[0], `doesn't exist`)
            }
        })
    }
    aColumn = ()=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        let backTwo = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 2).join('')
        let selectedBackOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        let previousAbcd = this.state.selectedZID.split('').slice(this.state.selectedZID.length - 2, this.state.selectedZID.length - 1)[0]
        // console.log({selectedBackOne})
        if(previousAbcd === 'a'){
            return (
                <div className='container_a'>                
                    <div className='a_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <div></div><br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>Select</button>                     
                    </div>
                    <div className='a_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>                    
                        <button onClick={this.setSelectedBFromPrev}>Select</button> 
                    </div>
                    <div className='a_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>Select</button>
                    </div>
                    <div className='a_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>Select</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'b'){
            return (
                <div className='container_a'>
                    <div className='b_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>Select</button> 
                    </div>
                    <div className='b_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        <div></div><br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>Select</button>
                    </div>
                    <div className='b_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>Select</button> 
                    </div>
                    <div className='b_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>Select</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'c'){
            return (
                <div className='container_a'>                
                    <div className='c_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>Select</button> 
                    </div>
                    <div className='c_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        <button onClick={this.setSelectedBFromPrev}>Select</button>
                    </div>
                    <div className='c_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <div></div><br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>Select</button>
                    </div>
                    <div className='c_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>Select</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'd'){
            return (
                <div className='container_a'>                
                    <div className='d_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>Select</button> 
                    </div>
                    <div className='d_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        <button onClick={this.setSelectedBFromPrev}>Select</button>
                    </div>
                    <div className='d_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>Select</button> 
                    </div>
                    <div className='d_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <div></div><br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>Select</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'z'){
            return (
                <div className='item_z'>
                    <div>Adventure Title</div><br/>
                    {this.state.adventureTitle}<br/> 
                    <input 
                        onChange={(e)=>{this.handleChange(`adventureTitle`, e.target.value)}}
                    /><br/>
                    {this.state[`${backOne}`]}<br/>
                    <input 
                        onChange={(e)=>{this.handleChange(`${backOne}`, e.target.value)}}
                    /><br/>
                    <button onClick={()=>{this.addOrUpdate(`${backOne}`, this.state[`${backOne}`])}}>Add</button><br/>
                </div>
            )
        }
    }
    bColumn = ()=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        // console.log({backOne})
        let selectedAbcd = this.state.selectedZID.split('').slice(this.state.selectedZID.length - 1)[0]
        // console.log(selecteAbcd)
        if(selectedAbcd === 'a'){
            return (
                <div className='container_b'>
                    <div className='a_item_aa'>  
                        {this.state[`${backOne}_a`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_a`, e.target.value)}}
                        /><br/>

                        <button onClick={()=>{this.addOrUpdate(`${backOne}_a`, this.state[`${backOne}_a`])}}>Add</button><br/>

                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])}}>Add</button><br/>
                    </div>
                    <div className='a_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>Select</button>
                    </div>
                    <div className='a_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>Select</button>
                    </div>
                    <div className='a_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>Select</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'b'){
            return (
                <div className='container_b'>                
                    <div className='b_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>Select</button> 
                    </div>
                    <div className='b_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_b`, e.target.value)}}
                        /><br/>
                        
                        <button onClick={()=>{this.addOrUpdate(`${backOne}_b`, this.state[`${backOne}_b`])}}>Add</button><br/>

                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])}}>Add</button><br/>
                    </div>
                    <div className='b_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>Select</button>
                    </div>
                    <div className='b_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>Select</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'c'){
            return (
                <div className='container_b'>                
                    <div className='c_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>Select</button>
                    </div>
                    <div className='c_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>Select</button>
                    </div>
                    <div className='c_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_c`, e.target.value)}}
                        /><br/>

                        <button onClick={()=>{this.addOrUpdate(`${backOne}_c`, this.state[`${backOne}_c`])}}>Add</button><br/>

                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])}}>Add</button><br/>
                    </div>
                    <div className='c_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>Select</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'd'){
            return (
                <div className='container_b'>                
                    <div className='d_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>Select</button>
                    </div>
                    <div className='d_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>Select</button>
                    </div>
                    <div className='d_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>Select</button>
                    </div>
                    <div className='d_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_d`, e.target.value)}}
                        /><br/>

                        <button onClick={()=>{this.addOrUpdate(`${backOne}_d`, this.state[`${backOne}_d`])}}>Add</button><br/>

                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])}}>Add</button><br/>
                    </div> 
                </div>
            )
        }
    }
    render(){
        console.log(this.state.adventure_id)
        return ( 
            <div className='container'> 
                {this.aColumn()}
                {this.bColumn()}
                <div className='container_c'>                
                    <div className='item_ca'>
                        {this.state[`${this.state.selectedZID}_a`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_a`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.sendToDatabase(`${this.state.selectedZID}_a`, this.state[`${this.state.selectedZID}_a`])}}>Add</button><br/>
                        <button onClick={this.setSelectedAFromNext}>Select</button>
                    </div>
                    <div className='item_cb'>
                        {this.state[`${this.state.selectedZID}_b`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_b`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.sendToDatabase(`${this.state.selectedZID}_b`, this.state[`${this.state.selectedZID}_b`])}}>Add</button><br/>
                        <button onClick={this.setSelectedBFromNext}>Select</button>
                    </div>
                    <div className='item_cc'>
                        {this.state[`${this.state.selectedZID}_c`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_c`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.sendToDatabase(`${this.state.selectedZID}_c`, this.state[`${this.state.selectedZID}_c`])}}>Add</button><br/>
                        <button onClick={this.setSelectedCFromNext}>Select</button>
                    </div>
                    <div className='item_cd'>
                        {this.state[`${this.state.selectedZID}_d`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_d`, e.target.value)}}
                        /><br/>
                        <button onClick={()=>{this.sendToDatabase(`${this.state.selectedZID}_d`, this.state[`${this.state.selectedZID}_d`])}}>Add</button><br/>
                        <button onClick={this.setSelectedDFromNext}>Select</button>
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
export default connect(mapToProps, null)(BuildComponents);