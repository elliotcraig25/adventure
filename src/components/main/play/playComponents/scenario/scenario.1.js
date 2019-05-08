// 

import React from 'react';

import Abcd from './abcd/abcd.1';
import axios from 'axios';
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
        if(this.props.id.adventure_id && this.state.zCur){
            axios.get(`/api/abcdoption/${this.props.id.adventure_id}/${this.state.zCur}`)
            .then(res=>{
                if(res.data.z_type === 'default'){
                    if(this.state.cLoop){
                        this.setState({
                            aLoop: null, 
                            bLoop: null,
                            cLoop: null,
                            dLoop: null
                        })
                    }
                }else if(res.data.z_type && res.data.z_type.split(' ')[0] === 'loop' && !this.state.aLoop){
                    if(res.data.z_type.split(' ')[1] !== 'none' && res.data.z_type.split(' ')[1]){
                        this.setState({
                            aLoop: res.data.z_type.split(' ')[1]
                        })
                    }
                    if(res.data.z_type.split(' ')[2] !== 'none' && res.data.z_type.split(' ')[2]){
                        this.setState({
                            bLoop: res.data.z_type.split(' ')[2]
                        })
                    }
                    if(res.data.z_type.split(' ')[3] !== 'none' && res.data.z_type.split(' ')[3]){
                        this.setState({
                            cLoop: res.data.z_type.split(' ')[3]
                        })
                    }
                    if(res.data.z_type.split(' ')[4] !== 'none' && res.data.z_type.split(' ')[4]){
                        this.setState({
                            dLoop: res.data.z_type.split(' ')[4]
                        })
                    }
                }else{
                    // console.log(`please dont loop`)
                }                
            }).catch(err=>console.log(err))
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
        if(this.props.dataObject){
            dataIndex = this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)
            zData = this.props.dataObject[dataIndex].z
            aData = this.props.dataObject[dataIndex].a
            bData = this.props.dataObject[dataIndex].b
            cData = this.props.dataObject[dataIndex].c
            dData = this.props.dataObject[dataIndex].d
        }
        console.log({aData},{bData},{cData},{dData},)
        if(this.props.a || this.props.b || this.props.c || this.props.d){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'} text={zData}/> 
                    </div>
                    {
                        this.props.a  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('A')]} className='options_a'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'} text={aData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        this.props.b  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('B')]} className='options_b'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'} text={bData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        this.props.c  ?
                        (
                            <div onClick={this[this.whereThisShouldGo('C')]} className='options_c'>
                                <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'c'} text={cData}/>
                            </div>
                        ):(
                            <></>
                        )
                    }
                    {
                        this.props.d  ?
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
        }else if(this.props.z){
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
        if(this.props.dataObject){            
            console.log(this.props.dataObject[this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)].z)
            console.log(this.props.dataObject[this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)].a)
            console.log(this.props.dataObject[this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)].b)
            console.log(this.props.dataObject[this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)].c)
            console.log(this.props.dataObject[this.props.dataObject.findIndex(ele=>ele.z_id === this.state.zCur)].d)
        }
        return (
            this.whichOptionsExist()
        )
    }
}
const mapToProps = reduxState => {
    return {
        z: reduxState.z,
        a: reduxState.a,
        b: reduxState.b,
        c: reduxState.c,
        d: reduxState.d 
    }
};
const dispatch = {
    updateReduxZABCD
};
export default connect(mapToProps, dispatch)(Scenario);