// 

import React from 'react';

import Abcd from './abcd/abcd.2';
// import axios from 'axios';
import {connect} from 'react-redux';
import {updateReduxZABCD} from '../../../../../ducks/reducer';

class Scenario extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            zCur: 'z',
            id: 0,
            aLoop: null, 
            bLoop: null,
            cLoop: null,
            dLoop: null,
            info: {}
        }
    }
    componentDidMount(){
        this.setState({
            id: this.props.id.adventure_id
        });      
    }

    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            this.getZType()
        } 
    }

    getZType = ()=>{
        let currentZIndex = this.props.thisData.findIndex(ele=>ele.z_id === this.state.zCur)
        console.log({currentZIndex})
        let currentData = this.props.thisData[currentZIndex]
        console.log({currentData})
        if(currentData){
            if(currentData.z_type === 'default'){
                if(this.state.cLoop){
                    this.setState({
                        aLoop: null, 
                        bLoop: null,
                        cLoop: null,
                        dLoop: null
                    })
                }
            }else if(currentData.z_type && currentData.z_type.split(' ')[0] === 'loop' && !this.state.aLoop){
                if(currentData.z_type.split(' ')[1] !== 'none' && currentData.z_type.split(' ')[1]){
                    this.setState({
                        aLoop: currentData.z_type.split(' ')[1]
                    })
                }
                if(currentData.z_type.split(' ')[2] !== 'none' && currentData.z_type.split(' ')[2]){
                    this.setState({
                        bLoop: currentData.z_type.split(' ')[2]
                    })
                }
                if(currentData.z_type.split(' ')[3] !== 'none' && currentData.z_type.split(' ')[3]){
                    this.setState({
                        cLoop: currentData.z_type.split(' ')[3]
                    })
                }
                if(currentData.z_type.split(' ')[4] !== 'none' && currentData.z_type.split(' ')[4]){
                    this.setState({
                        dLoop: currentData.z_type.split(' ')[4]
                    })
                }
            }
        }
    }

    startOver = ()=>{
        this.setState({
            zCur: 'z'
        })
    } 
    joinWith = (letter)=>{
        this.setState({
            zCur: this.state.zCur + letter
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
    isNotDefaultA = ()=>{
        if(this.state.aLoop !== this.state.zCur){
            this.setState({
                zCur: this.state.aLoop
            })
        }else{
            this.setState({
                zCur: this.state.zCur,
                aLoop: null,
                bLoop: null,
                cLoop: null,
                dLoop: null,
            }) 
        } 
    }
    isNotDefaultB = ()=>{
        if(this.state.bLoop !== this.state.zCur){
            this.setState({
                zCur: this.state.bLoop
            })
        }else{
            this.setState({
                zCur: this.state.zCur,
                aLoop: null,
                bLoop: null,
                cLoop: null,
                dLoop: null,
            }) 
        } 
    }
    isNotDefaultC = ()=>{
        if(this.state.cLoop !== this.state.zCur){
            // console.log(`hitting in first`)
            this.setState({
                zCur: this.state.cLoop
            })
        }else{
            this.setState({
                zCur: this.state.zCur,
                aLoop: null,
                bLoop: null,
                cLoop: null,
                dLoop: null,
            }) 
        } 
    }
    isNotDefaultD = ()=>{
        if(this.state.dLoop !== this.state.zCur){
            this.setState({
                zCur: this.state.dLoop
            })
        }else{
            this.setState({
                zCur: this.state.zCur,
                aLoop: null,
                bLoop: null,
                cLoop: null,
                dLoop: null, 
            }) 
        } 
    }
    whereThisShouldGo = (choice) => {
        this.getZType();
        if (this.state[choice.toLowerCase() + 'Loop']){
            return 'isNotDefault' + choice;
        }
        return 'joinWith' + choice;
    };
    whichOptionsExist(){
        console.log('hit here', this.props.dataObject)
        let dataIndex = 0
        let zData = undefined
        let aData = undefined
        let bData = undefined
        let cData = undefined
        let dData = undefined
        if(this.props.thisData[0]){
            dataIndex = this.props.thisData.findIndex(ele=>ele.z_id === this.state.zCur)
            zData = this.props.thisData[dataIndex].z
            aData = this.props.thisData[dataIndex].a
            bData = this.props.thisData[dataIndex].b
            cData = this.props.thisData[dataIndex].c
            dData = this.props.thisData[dataIndex].d
        }
        console.log({aData},{bData},{cData},{dData},)
        if(aData || bData || cData || dData){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'} text={zData}/> 
                    </div>
                    {
                        aData ?
                        (
                            <div onClick={this[this.whereThisShouldGo('A')]} className='options_a'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'} text={aData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        bData  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('B')]} className='options_b'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'} text={bData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        cData  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('C')]} className='options_c'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'c'} text={cData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        dData  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('D')]} className='options_d'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'d'} text={dData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                </div>
            )
        }else{
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'} text={zData}/>
                    </div>
                    <div onClick={()=>this.startOver()} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'} text='Start Over'/>
                    </div>
                </div>
            ) 
        }
    }
    render(){
        console.log('lets check it out', this.props.thisData)
        return (
            this.whichOptionsExist()
        )
    }
}
const mapToProps = reduxState => {
    return {
        thisData: reduxState.data
    }
};
const dispatch = {
    updateReduxZABCD
};
export default connect(mapToProps, dispatch)(Scenario);