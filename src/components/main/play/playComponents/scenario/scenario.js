import React from 'react';

import Abcd from './abcd/abcd';

class Scenario extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            zCur: 'z'
        }
    }
    componentDidMount(){
        this.setState({
            id: this.props.id.adventure_id
        })
    }
    joinWithA = ()=>{
        this.setState({
            zCur: this.state.zCur + 'a'
        })
    } 
    joinWithB = ()=>{
        this.setState({
            zCur: this.state.zCur + 'b'
        })
    } 
    joinWithC = ()=>{
        this.setState({
            zCur: this.state.zCur + 'c'
        })
    } 
    joinWithD = ()=>{
        this.setState({
            zCur: this.state.zCur + 'd'
        })
    }
    render(){
        // console.log(this.props.id.adventure_id)
        // console.log(this.state.id)
        return (
            <div className='scenario_and_options'>
                <div className='the_scenario'>
                    <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                </div>
                <button onClick={this.joinWithA} className='options_a'>
                    <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                </button>
                <button onClick={this.joinWithB} className='options_b'>
                    <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'}/>
                </button>
                <button onClick={this.joinWithC} className='options_c'>
                    <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'c'}/>
                </button>
                <button onClick={this.joinWithD} className='options_d'>
                    <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'d'}/>
                </button>                
            </div>
        )
    }
}

export default Scenario