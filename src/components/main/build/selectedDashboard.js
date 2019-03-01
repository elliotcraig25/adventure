import React from 'react';
import './build.css';
import axios from 'axios';

class SelectedDashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            whereALoopsTo: 'none',
            whereBLoopsTo: 'none',
            whereCLoopsTo: 'none',
            whereDLoopsTo: 'none',            
        }
    }
    whatIsTheZType = ()=>{
        if(!this.props.selectedZType){
            return 'default'
        }else{
            return this.props.selectedZType
        }
    }
    loopTypeToSendToDataBase = ()=>{
        return `loop ${this.state.whereALoopsTo} ${this.state.whereBLoopsTo} ${this.state.whereCLoopsTo} ${this.state.whereDLoopsTo}`
    }
    addLoopToDB = ()=>{
        let loopInfo = this.loopTypeToSendToDataBase()
        const {selectedBranch, aID} = this.props
        axios.post(`/api/changetypeloop`, {loopInfo, selectedBranch, aID}) 
        .then(res=>{
            this.setState({
                whereALoopsTo: 'none',
                whereBLoopsTo: 'none',
                whereCLoopsTo: 'none',
                whereDLoopsTo: 'none',  
            })
            res.sendStatus(200)
        }).catch(err=>console.log(err))
    }
    deleteSelectedBranchFromDataBase = ()=>{
        if(this.props.selectedBranch){
            axios.delete(`/api/deletebranch/${this.props.aID}/${this.props.selectedBranch}`)
            .then((res)=>console.log(res))
            .catch((err)=>{console.log(err)})
        }
    }
    render(){
        console.log(this.loopTypeToSendToDataBase())
        return (
            <div className='selected_dashboard_container'>
                <div className='display_what_branch_is_selected'>
                    Selected Branch: {this.props.selectedBranch}
                    <div>Type: {this.whatIsTheZType()}</div>
                    <button onClick={this.props.changeSelectedZIDType}>Change Type</button>
                    {
                        this.whatIsTheZType() === 'loop' ? (
                            <div>
                                Option A Loops to: 
                                <input
                                    value={this.state.whereALoopsTo}
                                    onChange={e=>{this.setState({whereALoopsTo: e.target.value})}}
                                /><br/>
                                Option B Loops to:
                                <input
                                    value={this.state.whereBLoopsTo}
                                    onChange={e=>{this.setState({whereBLoopsTo: e.target.value})}}
                                /><br/>
                                Option C Loops to: 
                                <input
                                    value={this.state.whereCLoopsTo}
                                    onChange={e=>{this.setState({whereCLoopsTo: e.target.value})}}
                                /><br/>
                                Option D Loops to: 
                                <input
                                    value={this.state.whereDLoopsTo}
                                    onChange={e=>{this.setState({whereDLoopsTo: e.target.value})}}
                                /><br/>
                                <button
                                    onClick={this.addLoopToDB}
                                >Add loops</button>

                            </div>
                        ):(
                            <div></div>
                        )
                    }
                    <button onClick={this.deleteSelectedBranchFromDataBase}>delete</button>
                </div>
            </div>
        )
    }
}

export default SelectedDashboard;