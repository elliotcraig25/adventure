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

    // 
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
    handleToggelChangeABCD = (ABCD)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        this.setState({
            [`${backOne}_${ABCD}_toggle`]: false
        })
    }
    
    // 
    handleToggelChangeZ = ()=>{
        this.setState({
            [`${this.state.selectedZID}_z_toggle`]: false
        })
    }

    // 
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
    
    columnAItemSmall = (letter, bigLetter)=>{
        let backTwo = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 2).join('')
        return (            
            <div className={`${bigLetter}_item_a${letter}`}>
                <div className='a_item_ab_text_not_selected'>
                    {this.state[`${backTwo}_${letter}`]}<br/>
                </div>
                <button className='a_item_ab_select_button' onClick={this.setSelectedABCDFromPrev(letter)}>Back</button> 
            </div>
        )
    }

    columnAItemBig = (letter)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        let backTwo = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 2).join('')
        let selectedBackOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        return (                        
            <div className={`${letter}_item_a${letter}`}>
                <div className='a_item_aa_id'>{`ID: ${backOne}`}</div>
                {/* <div className='a_item_aa_type'>Type: </div> */}
                <div className='previous_option_text'>
                    {this.state[`${backTwo}_${letter}`]}
                </div>
                <div className='previous_scenario_text'>                            
                    {this.state[`${selectedBackOne}_z`]}
                </div>
                <button 
                    className='previous_select_button'
                    onClick={this.setSelectedBackOne}
                >Back</button>
            </div>
        )
    }

    columnAItemZ = ()=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        return (
            <div className='item_z'>
                <div className='title_and_categories_header'>Title</div>
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

    aColumn = ()=>{
        let previousAbcd = this.state.selectedZID.split('').slice(this.state.selectedZID.length - 2, this.state.selectedZID.length - 1)[0]
        if(previousAbcd === 'a'){
            return (
                <div className='container_a'>  
                    {this.columnAItemBig('a')}
                    {this.columnAItemSmall('b', 'a')}
                    {this.columnAItemSmall('c', 'a')}
                    {this.columnAItemSmall('d', 'a')}
                </div>
            )
        }else if(previousAbcd === 'b'){
            return (
                <div className='container_a'>
                    {this.columnAItemSmall('a', 'b')}
                    {this.columnAItemBig('b')}
                    {this.columnAItemSmall('c', 'b')}
                    {this.columnAItemSmall('d', 'b')}
                </div>
            )
        }else if(previousAbcd === 'c'){
            return (
                <div className='container_a'>                
                    {this.columnAItemSmall('a', 'c')}
                    {this.columnAItemSmall('b', 'c')}
                    {this.columnAItemBig('c')}
                    {this.columnAItemSmall('d', 'c')}
                </div> 
            )
        }else if(previousAbcd === 'd'){
            return (
                <div className='container_a'>                
                    {this.columnAItemSmall('a', 'd')}
                    {this.columnAItemSmall('b', 'd')}
                    {this.columnAItemSmall('c', 'd')}
                    {this.columnAItemBig('d')}
                </div>
            )
        }else if(previousAbcd === 'z'){
            return (
                <div className='item_z_container'>
                   {this.columnAItemZ()}
                </div>
            )
        }
    }

    columnBItemSmall = (letter, bigLetter)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        return (
            <div className={`${bigLetter}_item_a${letter}`}>
                <div className='a_item_ab_text_not_selected'>
                    {this.state[`${backOne}_${letter}`]}
                </div>
                <button className='a_item_ab_select_button' onClick={this.setSelectedFromABCD(letter)}>{letter.toUpperCase()}</button>
            </div>
        )
    }

    columnBItemBig = (letter)=>{
        let backOne = this.state.selectedZID.split('').slice(0, this.state.selectedZID.length - 1).join('')
        return (
            <div className={`${letter}_item_a${letter}`}>
                <div className='a_item_aa_id'>ID: {this.state.selectedZID}</div>
                {/* <div className='a_item_aa_type'>Type: {this.state[`${this.state.selectedZID}Type`]}</div> */}
                {
                    this.state[`${backOne}_${letter}_toggle`] ? (
                        <div className='a_item_aa_input_and_add'>
                            <div>{this.state[`${backOne}_${letter}`]}</div>
                            <div>{this.editButtonABCD(`${letter}`)}</div>
                        </div>
                    ):(
                        <div className='a_item_aa_input_and_add'>
                            <input 
                                onChange={(e)=>{this.handleChange(`${backOne}_${letter}`, e.target.value)}}
                            />
                            <button onClick={()=>{
                                this.addOrUpdate(`${backOne}_${letter}`, this.state[`${backOne}_${letter}`])
                                this.viewTextToggle(`${backOne}_${letter}_toggle`, true)
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
        )
    }

    bColumn = ()=>{
        let selectedAbcd = this.state.selectedZID.split('').slice(this.state.selectedZID.length - 1)[0]
        if(selectedAbcd === 'a'){
            return (
                <div className='container_b'>                    
                    {this.columnBItemBig('a')}
                    {this.columnBItemSmall('b', 'a')}
                    {this.columnBItemSmall('c', 'a')}
                    {this.columnBItemSmall('d', 'a')}
                </div>
            )
        }else if(selectedAbcd === 'b'){
            return (
                <div className='container_b'>                
                    {this.columnBItemSmall('a', 'b')}                    
                    {this.columnBItemBig('b')}
                    {this.columnBItemSmall('c', 'b')}
                    {this.columnBItemSmall('d', 'b')}
                </div>
            )
        }else if(selectedAbcd === 'c'){
            return (
                <div className='container_b'>                
                    {this.columnBItemSmall('a', 'c')}
                    {this.columnBItemSmall('b', 'c')}                    
                    {this.columnBItemBig('c')}
                    {this.columnBItemSmall('d', 'c')}
                </div>
            )
        }else if(selectedAbcd === 'd'){
            return (
                <div className='container_b'>                
                    {this.columnBItemSmall('a', 'd')}
                    {this.columnBItemSmall('b', 'd')}
                    {this.columnBItemSmall('c', 'd')}                    
                    {this.columnBItemBig('d')} 
                </div>
            )
        }
    }

    cColumnItem = (letter)=>{
        return (
            <div className={`item_c${letter}`}>
                <div className='item_ca_id'>
                    ID: {this.state.selectedZID.slice(0) + letter}
                </div>
                <div className='item_ca_text'>
                    {this.state[`${this.state.selectedZID}_${letter}`]}<br/>
                </div>
                <button 
                    className='item_ca_button'
                    onClick={this.setSelectedABCDFromNext(letter)}
                >Next</button>
            </div>
        )
    }

    cColumn = ()=>{
        return (
            <div className='container_c'>
                {this.cColumnItem('a')}
                {this.cColumnItem('b')}
                {this.cColumnItem('c')}
                {this.cColumnItem('d')}
            </div>
        )
    }

    // branchLines = ()=>{
    //     return (

    //     )
    // }

    branchLinesStructure = (columnOne, columnTwo)=>{
        return (
            <div className='branch_lines'>
                <div className={`branch_line_one_${columnOne}_${columnTwo}`}></div>
                <div className={`branch_line_two_${columnOne}_${columnTwo}`}></div>
                <div className={`branch_line_three_${columnOne}_${columnTwo}`}></div>
                <div className={`branch_line_four_${columnOne}_${columnTwo}`}></div>
                <div className={`branch_line_five_${columnOne}_${columnTwo}`}></div>
                <div className={`branch_line_six_${columnOne}_${columnTwo}`}></div>
            </div>
        )
    }

    render(){
        // console.log(this.state.adventure_id)
        let backLetter = this.state.selectedZID.split('').pop()
        let backBackLetter = this.state.selectedZID.split('').slice(this.state.selectedZID.length - 2)[0]
        console.log({backBackLetter})
        return ( 
            <div className='main_build'>
                <div className='container'> 
                    {this.aColumn()}
                    {this.branchLinesStructure(`${backBackLetter}`, `${backLetter}`)}
                    {this.bColumn()}
                    {this.branchLinesStructure(`${backLetter}`, `x`)}
                    {this.cColumn()}
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