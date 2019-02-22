import React from 'react';
import './build.css';

class BuildComponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedZID: 'za'
        };
    }; 
    setSelectedA = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'a'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedB = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'b'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedC = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'c'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedD = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + 'd'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedAFromNext = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0) + 'a'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBFromNext = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0) + 'b'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedCFromNext = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0) + 'c'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedDFromNext = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0) + 'd'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedAFromPrev = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'a'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBFromPrev = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'b'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedCFromPrev = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'c'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedDFromPrev = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + 'd'
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
    }
    setSelectedBackOne = ()=>{
        // console.log(this.state.selectedZID)
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1)
        // console.log(newSelectedZID)
        this.setState({selectedZID: newSelectedZID})
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
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>a</button>                     
                    </div>
                    <div className='a_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>                    
                        <button onClick={this.setSelectedBFromPrev}>b</button> 
                    </div>
                    <div className='a_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>c</button>
                    </div>
                    <div className='a_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>d</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'b'){
            return (
                <div className='container_a'>
                    <div className='b_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>a</button> 
                    </div>
                    <div className='b_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>b</button>
                    </div>
                    <div className='b_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>c</button> 
                    </div>
                    <div className='b_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>d</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'c'){
            return (
                <div className='container_a'>                
                    <div className='c_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>a</button> 
                    </div>
                    <div className='c_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        <button onClick={this.setSelectedBFromPrev}>b</button>
                    </div>
                    <div className='c_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>d</button>
                    </div>
                    <div className='c_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        <button onClick={this.setSelectedDFromPrev}>d</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'd'){
            return (
                <div className='container_a'>                
                    <div className='d_item_aa'>
                        {this.state[`${backTwo}_a`]}<br/>
                        <button onClick={this.setSelectedAFromPrev}>a</button> 
                    </div>
                    <div className='d_item_ab'>
                        {this.state[`${backTwo}_b`]}<br/>
                        <button onClick={this.setSelectedBFromPrev}>b</button>
                    </div>
                    <div className='d_item_ac'>
                        {this.state[`${backTwo}_c`]}<br/>
                        <button onClick={this.setSelectedCFromPrev}>c</button> 
                    </div>
                    <div className='d_item_ad'>
                        {this.state[`${backTwo}_d`]}<br/>
                        {this.state[`${selectedBackOne}_z`]}<br/>
                        <button onClick={this.setSelectedBackOne}>d</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'z'){
            return (
                <div className='item_z'>                
                    {this.state[`${backOne}`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}`, e.target.value)}}
                        /><br/>
                </div>
            )
        }
    }
    handleChange = (prop, val)=>{
        this.setState({
            [prop]: val
        })
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
                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                    </div>
                    <div className='a_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>b</button>
                    </div>
                    <div className='a_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>c</button>
                    </div>
                    <div className='a_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>d</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'b'){
            return (
                <div className='container_b'>                
                    <div className='b_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>a</button>
                    </div>
                    <div className='b_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_b`, e.target.value)}}
                        /><br/>
                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                    </div>
                    <div className='b_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>c</button>
                    </div>
                    <div className='b_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>d</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'c'){
            return (
                <div className='container_b'>                
                    <div className='c_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>a</button>
                    </div>
                    <div className='c_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>b</button>
                    </div>
                    <div className='c_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_c`, e.target.value)}}
                        /><br/>
                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                    </div>
                    <div className='c_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <button onClick={this.setSelectedD}>d</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'd'){
            return (
                <div className='container_b'>                
                    <div className='d_item_aa'>
                        {this.state[`${backOne}_a`]}<br/>
                        <button onClick={this.setSelectedA}>a</button>
                    </div>
                    <div className='d_item_ab'>
                        {this.state[`${backOne}_b`]}<br/>
                        <button onClick={this.setSelectedB}>b</button>
                    </div>
                    <div className='d_item_ac'>
                        {this.state[`${backOne}_c`]}<br/>
                        <button onClick={this.setSelectedC}>c</button>
                    </div>
                    <div className='d_item_ad'>
                        {this.state[`${backOne}_d`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${backOne}_d`, e.target.value)}}
                        /><br/>
                        {this.state[`${this.state.selectedZID}_z`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                        /><br/>
                    </div> 
                </div>
            )
        }
    }
    render(){
        // console.log(this.state.selectedZIDBackOne)
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
                        <button onClick={this.setSelectedAFromNext}>a</button>
                    </div>
                    <div className='item_cb'>
                        {this.state[`${this.state.selectedZID}_b`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_b`, e.target.value)}}
                        /><br/>
                        <button onClick={this.setSelectedBFromNext}>b</button>
                    </div>
                    <div className='item_cc'>
                        {this.state[`${this.state.selectedZID}_c`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_c`, e.target.value)}}
                        /><br/>
                        <button onClick={this.setSelectedCFromNext}>c</button>
                    </div>
                    <div className='item_cd'>
                        {this.state[`${this.state.selectedZID}_d`]}<br/>
                        <input 
                            onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_d`, e.target.value)}}
                        /><br/>
                        <button onClick={this.setSelectedDFromNext}>d</button>
                    </div>
                </div>
            </div>
        )
    };
};

export default BuildComponents;