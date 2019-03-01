import React from 'react';
import './build.css';
import axios from 'axios';
import {connect} from 'react-redux';
import TreeDashboard from './treeDashboard';
import SelectedDashboard from './selectedDashboard';

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

    changeSelectedZIDType = ()=>{
        if(!this.state[`${this.state.selectedZID}Type`] || this.state[`${this.state.selectedZID}Type`] === 'default'){
            this.setState({
                [`${this.state.selectedZID}Type`]: 'loop'
            })
        }else{
            this.setState({
                [`${this.state.selectedZID}Type`]: 'default'
            })
        }
    }

    // This removes one letter and then adds 'a' 'b' 'c' or 'd' to the end of selectedZID in state when the A B C or D button is pressed in the column B
    setSelectedFromABCD = (ABCD)=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1) + ABCD
        return ()=>{this.setState({selectedZID: newSelectedZID})}
    }

    // This adds 'a' 'b' 'c' or 'd' to the end of selectedZID in state when the Next button is pressed in column C
    setSelectedABCDFromNext = (ABCD)=>{
        let newSelectedZID = this.state.selectedZID.slice(0) + ABCD
        return ()=>this.setState({selectedZID: newSelectedZID})
    }

    // This revmoves two letters and then adds 'a' 'b' 'c' or 'd' to the end of selectedZID in state when Back button is pressed in column A
    setSelectedABCDFromPrev = (ABCD)=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 2) + ABCD
        return ()=>this.setState({selectedZID: newSelectedZID})
    }

    // This removes one letter from selectedZID, taking the user back to what was previously selected
    setSelectedBackOne = ()=>{
        let newSelectedZID = this.state.selectedZID.slice(0, this.state.selectedZID.length - 1)
        this.setState({selectedZID: newSelectedZID})
    }

    // Handles change, mostly for the inputs
    handleChange = (prop, val)=>{
        this.setState({
            [prop]: val
        })
    }

    // 
    sendToDatabase = (prop, val)=>{
        const aID = this.state.adventure_id
        axios.put(`/api/buildinfotodatabase`, {prop, val, aID})
    }

    // 
    createNewRow(prop, val){
        const aID = this.state.adventure_id
        let newZID = `${this.state.selectedZID}`        
        axios.post(`/api/create_new_row`, {newZID, aID})
        .then(()=>{
            this.sendToDatabase(prop, val)
        })
    }

    // 
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

    // 
    viewTextToggle = (prop, val)=>{
        this.setState({
            [prop]: val
        })
    }

    viewTextToggleLessInvoked = (prop, val)=>{
        return (
            ()=>{                
                this.setState({
                    [prop]: val
                })
            }
        )
    }

    // 
    addTitle = ()=>{
        const {adventure_id, adventureTitle} = this.state
        axios.post(`/api/add_title`, {adventure_id, adventureTitle})
    }

    // 
    handleToggelChangeZ = ()=>{
        this.setState({
            [`${this.state.selectedZID}_z_toggle`]: false
        })
    }

    handleToggelChangeABCD = (ABCD)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        this.setState({
            [`${backOne}_${ABCD}_toggle`]: false
        })
    }
    // handleToggelChangeA = ()=>{
    //     let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
    //     this.setState({
    //         [`${backOne}_a_toggle`]: false
    //     })
    // }
    // handleToggelChangeB = ()=>{
    //     let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
    //     this.setState({
    //         [`${backOne}_b_toggle`]: false
    //     })
    // }
    // handleToggelChangeC = ()=>{
    //     let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
    //     this.setState({
    //         [`${backOne}_c_toggle`]: false
    //     })
    // }
    // handleToggelChangeD = ()=>{
    //     let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
    //     this.setState({
    //         [`${backOne}_d_toggle`]: false
    //     })
    // }
    editButtonZ = ()=>{
        return (
                <button
                    onClick={
                        this.handleToggelChangeZ
                    }
                >edit</button> 
            )
    }
    editButtonABCD = (ABCD)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        return (
                <button
                    onClick={
                        this.viewTextToggleLessInvoked(`${backOne}_${ABCD}_toggle`, false)
                    }
                >edit</button>
            )
    }
    editButtonB = ()=>{
        return (
                <button
                    onClick={
                        this.handleToggelChangeB
                    }
                >edit</button> 
            )
    }
    editButtonC = ()=>{
        return (
                <button
                    onClick={
                        this.handleToggelChangeC
                    }
                >edit</button> 
            )
    }
    editButtonD = ()=>{
        return (
                <button
                    onClick={
                        this.handleToggelChangeD
                    }
                >edit</button>
            )
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
                        <div className='a_item_aa_id'>ID: {backOne}</div>
                        <div className='a_item_aa_type'>Type: default</div>              
                        <div className='previous_option_text'>
                            {this.state[`${backTwo}_a`]}
                        </div>
                        <div className='previous_scenario_text'>                            
                            {this.state[`${selectedBackOne}_z`]}
                        </div>
                        <button 
                            className='previous_select_button'
                            onClick={this.setSelectedBackOne}
                        >Back</button>
                    </div>
                    <div className='a_item_ab'> 
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backTwo}_b`]}<br/>
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('b')}>Back</button> 
                    </div>
                    <div className='a_item_ac'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backTwo}_c`]}<br/>
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('c')}>Back</button>
                    </div>
                    <div className='a_item_ad'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_d`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('d')}>Back</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'b'){
            return (
                <div className='container_a'>
                    <div className='b_item_aa'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_a`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('a')}>Back</button> 
                    </div>
                    <div className='b_item_ab'>
                        <div className='a_item_aa_id'>ID: {backOne}</div>
                        <div className='a_item_aa_type'>Type: default</div> 
                        <div className='previous_option_text'>
                            {this.state[`${backTwo}_b`]}
                        </div>
                        <div className='previous_scenario_text'>                            
                            {this.state[`${selectedBackOne}_z`]}
                        </div>
                        <button 
                            className='previous_select_button'
                            onClick={this.setSelectedBackOne}
                        >Back</button> 
                    </div>
                    <div className='b_item_ac'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_c`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('c')}>Back</button> 
                    </div>
                    <div className='b_item_ad'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_d`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('d')}>Back</button>
                    </div>
                </div>
            )
        }else if(previousAbcd === 'c'){
            return (
                <div className='container_a'>                
                    <div className='c_item_aa'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_a`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('a')}>Back</button> 
                    </div>
                    <div className='c_item_ab'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_b`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('b')}>Back</button>
                    </div>
                    <div className='c_item_ac'>
                        <div className='a_item_aa_id'>ID: {backOne}</div>
                        <div className='a_item_aa_type'>Type: default</div> 
                        <div className='previous_option_text'>
                            {this.state[`${backTwo}_c`]}
                        </div>
                        <div className='previous_scenario_text'>                            
                            {this.state[`${selectedBackOne}_z`]}
                        </div>
                        <button 
                            className='previous_select_button'
                            onClick={this.setSelectedBackOne}
                        >Back</button> 
                    </div>
                    <div className='c_item_ad'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_d`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('d')}>Back</button>
                    </div>
                </div> 
            )
        }else if(previousAbcd === 'd'){
            return (
                <div className='container_a'>                
                    <div className='d_item_aa'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_a`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('a')}>Back</button> 
                    </div>
                    <div className='d_item_ab'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_b`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('b')}>Back</button>
                    </div>
                    <div className='d_item_ac'>
                        <div className='a_item_ab_text_not_selected'>                            
                            {this.state[`${backTwo}_c`]}<br/>                    
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev('c')}>Back</button> 
                    </div>
                    <div className='d_item_ad'>
                        <div className='a_item_aa_id'>ID: {backOne}</div>
                        <div className='a_item_aa_type'>Type: default</div> 
                        <div className='previous_option_text'>
                            {this.state[`${backTwo}_d`]}
                        </div>
                        <div className='previous_scenario_text'>                            
                            {this.state[`${selectedBackOne}_z`]}
                        </div>
                        <button 
                            className='previous_select_button'
                            onClick={this.setSelectedBackOne}
                        >Back</button> 
                    </div>
                </div>
            )
        }else if(previousAbcd === 'z'){
            return (
                <div className='item_z'>
                    <div className='title_and_categories_header'>Title</div>
                    {/* {this.state.adventureTitle} */}
                    {
                        this.state.z_text_toggle ? (
                            <div className='z_textarea'>{this.state[`${backOne}`]}</div>
                        ):(
                            <textarea
                                className='z_textarea'
                                onChange={(e)=>{this.handleChange(`${backOne}`, e.target.value)}}
                            />
                        )
                    }
                    <input 
                        className='title_input'
                        onChange={(e)=>{this.handleChange(`adventureTitle`, e.target.value)}}
                    />
                    <div className='category_dropdown_one'></div>
                    <div className='category_dropdown_two'></div>
                    <div className='category_dropdown_three'></div>
                    <button 
                        className='add_title_and_categories'
                        onClick={this.addTitle}>Add</button>
                    {/* {this.state[`${backOne}`]} */} 
                    <div className='item_z_id'>
                        ID: z
                    </div>
                    <div className='item_z_type'>
                        Type: default
                    </div>                    
                    <button 
                        className='add_z_testarea'
                        onClick={()=>{
                            this.addOrUpdate(`${backOne}`, this.state[`${backOne}`])
                            this.viewTextToggle(`z_text_toggle`, true)
                        }}>Add</button>
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
                        <div className='a_item_aa_id'>ID: {this.state.selectedZID}</div>
                        <div className='a_item_aa_type'>Type: {this.state[`${this.state.selectedZID}Type`]}</div>
                        {
                            this.state[`${backOne}_a_toggle`] ? (
                                <div className='a_item_aa_input_and_add'>
                                    <div>{this.state[`${backOne}_a`]}</div>
                                    <div>{this.editButtonABCD('a')}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_input_and_add'>
                                    <input 
                                        onChange={(e)=>{this.handleChange(`${backOne}_a`, e.target.value)}}
                                    />
                                    <button onClick={()=>{
                                        this.addOrUpdate(`${backOne}_a`, this.state[`${backOne}_a`])
                                        this.viewTextToggle(`${backOne}_a_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                        {
                            this.state[`${this.state.selectedZID}_z_toggle`] ? (
                                <div className='a_item_aa_textarea_and_add'>
                                    <div className='a_item_aa_z_textarea'>{this.state[`${this.state.selectedZID}_z`]}</div>
                                    <div className='a_item_aa_z_button'>{this.editButtonZ()}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_textarea_and_add'> 
                                    <textarea 
                                        className='a_item_aa_z_textarea'
                                        onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                                    />
                                    <button 
                                        className='a_item_aa_z_button'
                                        onClick={()=>{
                                            this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])
                                            this.viewTextToggle(`${this.state.selectedZID}_z_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                    </div>
                    <div className='a_item_ab'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_b`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('b')}>B</button>
                    </div>
                    <div className='a_item_ac'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_c`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('c')}>C</button>
                    </div>
                    <div className='a_item_ad'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_d`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('d')}>D</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'b'){
            return (
                <div className='container_b'>                
                    <div className='b_item_aa'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_a`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('a')}>A</button>
                    </div>
                    <div className='b_item_ab'>
                        <div className='a_item_aa_id'>ID: {this.state.selectedZID}</div>
                        <div className='a_item_aa_type'>Type: {this.state[`${this.state.selectedZID}Type`]}</div>
                        {
                            this.state[`${backOne}_b_toggle`] ? (
                                <div  className='a_item_aa_input_and_add'>                                    
                                    <div>{this.state[`${backOne}_b`]}</div>
                                    <div>{this.editButtonABCD('b')}</div>
                                </div>
                            ):(
                                <div  className='a_item_aa_input_and_add'>
                                    <input 
                                        onChange={(e)=>{this.handleChange(`${backOne}_b`, e.target.value)}}
                                    />
                                    <button onClick={()=>{
                                        this.addOrUpdate(`${backOne}_b`, this.state[`${backOne}_b`])
                                        this.viewTextToggle(`${backOne}_b_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                        {
                            this.state[`${this.state.selectedZID}_z_toggle`] ? (
                                <div className='a_item_aa_textarea_and_add'>                                    
                                    <div className='a_item_aa_z_textarea'>{this.state[`${this.state.selectedZID}_z`]}</div>
                                    <div className='a_item_aa_z_button'>{this.editButtonZ()}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_textarea_and_add'>
                                    <textarea 
                                        className='a_item_aa_z_textarea'
                                        onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                                    />
                                    <button 
                                        className='a_item_aa_z_button'
                                        onClick={()=>{
                                            this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])
                                            this.viewTextToggle(`${this.state.selectedZID}_z_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                    </div>
                    <div className='b_item_ac'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_c`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('c')}>C</button>
                    </div>
                    <div className='b_item_ad'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_d`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('d')}>D</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'c'){
            return (
                <div className='container_b'>                
                    <div className='c_item_aa'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_a`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('a')}>A</button>
                    </div>
                    <div className='c_item_ab'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_b`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('b')}>B</button>
                    </div>
                    <div className='c_item_ac'>
                        <div className='a_item_aa_id'>ID: {this.state.selectedZID}</div>
                        <div className='a_item_aa_type'>Type: {this.state[`${this.state.selectedZID}Type`]}</div>
                        {
                            this.state[`${backOne}_c_toggle`] ? (
                                <div className='a_item_aa_input_and_add'>                                    
                                    <div>{this.state[`${backOne}_c`]}</div>
                                    <div>{this.editButtonABCD('c')}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_input_and_add'>
                                    <input 
                                        onChange={(e)=>{this.handleChange(`${backOne}_c`, e.target.value)}}
                                    />
                                    <button onClick={()=>{
                                        this.addOrUpdate(`${backOne}_c`, this.state[`${backOne}_c`])
                                        this.viewTextToggle(`${backOne}_c_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                        {
                            this.state[`${this.state.selectedZID}_z_toggle`] ? (
                                <div className='a_item_aa_textarea_and_add'>                                    
                                    <div className='a_item_aa_z_textarea'>{this.state[`${this.state.selectedZID}_z`]}</div>
                                    <div className='a_item_aa_z_button'>{this.editButtonZ()}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_textarea_and_add'>
                                    <textarea 
                                        className='a_item_aa_z_textarea'
                                        onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                                    />
    
                                    <button 
                                        className='a_item_aa_z_button'
                                        onClick={()=>{
                                            this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])
                                            this.viewTextToggle(`${this.state.selectedZID}_z_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }
                    </div>
                    <div className='c_item_ad'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_d`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('d')}>D</button>
                    </div>
                </div>
            )
        }else if(selectedAbcd === 'd'){
            return (
                <div className='container_b'>                
                    <div className='d_item_aa'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_a`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('a')}>A</button>
                    </div>
                    <div className='d_item_ab'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_b`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('b')}>B</button>
                    </div>
                    <div className='d_item_ac'>
                        <div className='a_item_ab_text_not_selected'>
                            {this.state[`${backOne}_c`]}
                        </div>
                        <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD('c')}>C</button>
                    </div>
                    <div className='d_item_ad'>
                        <div className='a_item_aa_id'>ID: {this.state.selectedZID}</div>
                        <div className='a_item_aa_type'>Type: {this.state[`${this.state.selectedZID}Type`]}</div>
                        {
                            this.state[`${backOne}_d_toggle`] ? (
                                <div className='a_item_aa_input_and_add'>                                    
                                    <div>{this.state[`${backOne}_d`]}</div>
                                    <div>{this.editButtonABCD('d')}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_input_and_add'>
                                    <input 
                                        onChange={(e)=>{this.handleChange(`${backOne}_d`, e.target.value)}}
                                    />
    
                                    <button onClick={()=>{
                                        this.addOrUpdate(`${backOne}_d`, this.state[`${backOne}_d`])
                                        this.viewTextToggle(`${backOne}_d_toggle`, true)
                                    }}>Add</button>
                                </div> 
                            )
                        }
                        {
                            this.state[`${this.state.selectedZID}_z_toggle`] ? (
                                <div className='a_item_aa_textarea_and_add'>                                    
                                    <div className='a_item_aa_z_textarea'>{this.state[`${this.state.selectedZID}_z`]}</div>
                                    <div className='a_item_aa_z_button'>{this.editButtonZ()}</div>
                                </div>
                            ):(
                                <div className='a_item_aa_textarea_and_add'>
                                    <textarea 
                                        className='a_item_aa_z_textarea'
                                        onChange={(e)=>{this.handleChange(`${this.state.selectedZID}_z`, e.target.value)}}
                                    />
    
                                    <button 
                                        className='a_item_aa_z_button'
                                        onClick={()=>{
                                            this.addOrUpdate(`${this.state.selectedZID}_z`, this.state[`${this.state.selectedZID}_z`])
                                            this.viewTextToggle(`${this.state.selectedZID}_z_toggle`, true)
                                    }}>Add</button>
                                </div>
                            )
                        }                        
                    </div> 
                </div>
            )
        }
    }
    render(){
        // console.log(this.state.adventure_id)
        return ( 
            <div className='main_build'>
                <div className='container'> 
                    {this.aColumn()}
                    {this.bColumn()}
                    <div className='container_c'>                
                        <div className='item_ca'>
                            <div className='item_ca_id'>
                                ID: {this.state.selectedZID.slice(0) + 'a'}
                            </div>
                            <div className='item_ca_text'>
                                {this.state[`${this.state.selectedZID}_a`]}<br/>
                            </div>                                
                            <button 
                                className='item_ca_button'
                                onClick={this.setSelectedABCDFromNext('a')} 
                            >Next</button>
                        </div>
                        <div className='item_cb'>
                            <div className='item_ca_id'>
                                ID: {this.state.selectedZID.slice(0) + 'b'}
                            </div>
                            <div className='item_ca_text'>
                                {this.state[`${this.state.selectedZID}_b`]}<br/>
                            </div>                                
                            <button 
                                className='item_ca_button'
                                onClick={this.setSelectedABCDFromNext('b')}
                            >Next</button>
                        </div>
                        <div className='item_cc'>
                            <div className='item_ca_id'>
                                ID: {this.state.selectedZID.slice(0) + 'c'}
                            </div>
                            <div className='item_ca_text'>
                                {this.state[`${this.state.selectedZID}_c`]}<br/>
                            </div>                                
                            <button 
                                className='item_ca_button'
                                onClick={this.setSelectedABCDFromNext('c')}
                            >Next</button>
                        </div>
                        <div className='item_cd'>
                            <div className='item_ca_id'>
                                ID: {this.state.selectedZID.slice(0) + 'd'}
                            </div>
                            <div className='item_ca_text'>
                                {this.state[`${this.state.selectedZID}_d`]}<br/>
                            </div>                                
                            <button 
                                className='item_ca_button'
                                onClick={this.setSelectedABCDFromNext('d')}
                            >Next</button>
                        </div>
                    </div>
                </div>
                <TreeDashboard />
                <SelectedDashboard 
                    changeSelectedZIDType={this.changeSelectedZIDType}
                    aID={this.state.adventure_id}
                    selectedBranch={this.state.selectedZID} 
                    selectedZType={this.state[`${this.state.selectedZID}Type`]}
                />
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