import React from 'react';

import Abcd from './abcd/abcd';
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
        // console.log('hitting in componenet did mount')
        // this.getZType()
        this.setState({
            id: this.props.id.adventure_id
        });        
    }

    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            console.log('scenario: in componenet did update')
            console.log('scenario prevProps:', prevProps)
            console.log('scenario this.props:', this.props)
            this.getZType()
        } 
    }

    getZType = ()=>{
        if(this.props.id.adventure_id && this.state.zCur){
            axios.get(`/api/abcdoption/${this.props.id.adventure_id}/${this.state.zCur}`)
            .then(res=>{
                // this.setState({info: res.data})
                if(res.data.z_type === 'default' && this.state.aLoop){
                    // console.log(`in getZType 1`)
                    this.setState({
                        aLoop: null, 
                        bLoop: null,
                        cLoop: null,
                        dLoop: null
                    })
                }else if(!res.data.z_type){
                    // console.log(`in getZType 2`)
                    this.setState({
                        zCur: 'z'
                    })
                }else if(res.data.z_type.split(' ')[0] === 'loop' && !this.state.aLoop){
                    // console.log(`in getZType`)
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
        // this.props.updateReduxZABCD()
        this.setState({
            zCur: 'z'
        })
    } 
    joinWithA = ()=>{
        // this.props.updateReduxZABCD()
        this.setState({
            zCur: this.state.zCur + 'a'
        })
    } 
    joinWithB = ()=>{
        // this.props.updateReduxZABCD()
        this.setState({
            zCur: this.state.zCur + 'b'
        })
    } 
    joinWithC = ()=>{
        // this.props.updateReduxZABCD()
        this.setState({
            zCur: this.state.zCur + 'c'
        })
    } 
    joinWithD = ()=>{
        // this.props.updateReduxZABCD()
        this.setState({
            zCur: this.state.zCur + 'd'
        })
    }
    isNotDefaultA = ()=>{
        // this.props.updateReduxZABCD()
        // console.log(`in isNotDefaultA`)
        if(this.state.aLoop !== this.state.zCur){
            // console.log(`hitting in first`)
            this.setState({
                zCur: this.state.aLoop
            })
        }else{
            // console.log(`hitting in second`)
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
        // this.props.updateReduxZABCD()
        // console.log(`in isNotDefaultB`)
        if(this.state.bLoop !== this.state.zCur){
            // console.log(`hitting in first`)
            this.setState({
                zCur: this.state.bLoop
            })
        }else{
            // console.log(`hitting in second`)
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
        // this.props.updateReduxZABCD()
        // console.log(`in isNotDefaultC`)
        if(this.state.cLoop !== this.state.zCur){
            // console.log(`hitting in first`)
            this.setState({
                zCur: this.state.cLoop
            })
        }else{
            // console.log(`hitting in second`)
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
        // this.props.updateReduxZABCD()
        // console.log(`in isNotDefaultD`)
        if(this.state.dLoop !== this.state.zCur){
            // console.log(`hitting in first`)
            this.setState({
                zCur: this.state.dLoop
            })
        }else{
            // console.log(`hitting in second`)
            this.setState({
                zCur: this.state.zCur,
                aLoop: null,
                bLoop: null,
                cLoop: null,
                dLoop: null,
            }) 
        } 
    }
    whereAShouldGo = ()=>{
        this.getZType()
        if(this.state.aLoop){
            return 'isNotDefaultA'
        }else{
            return 'joinWithA'
        }
    }
    whereBShouldGo = ()=>{
        this.getZType()
        if(this.state.bLoop){
            return 'isNotDefaultB'
        }else{
            return 'joinWithB'
        }
    }
    whereCShouldGo = ()=>{
        if(this.state.cLoop){
            return 'isNotDefaultC'
        }else{
            return 'joinWithC'
        }
    }
    whereDShouldGo = ()=>{
        if(this.state.dLoop){
            return 'isNotDefaultD'
        }else{
            return 'joinWithD'
        }
    }
    whichOptionsExist(){
        if(
            this.props.z 
            && this.props.a && this.props.b && this.props.c && this.props.d
            ){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this[this.whereAShouldGo()]} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                    <button onClick={this[this.whereBShouldGo()]} className='options_b'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'}/>
                    </button>
                    <button onClick={this[this.whereCShouldGo()]} className='options_c'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'c'}/>
                    </button>
                    <button onClick={this[this.whereDShouldGo()]} className='options_d'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'d'}/>
                    </button>                
                </div>
            )
        }else if(this.props.z && this.props.a && this.props.b && this.props.c && !this.props.d){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this[this.whereAShouldGo()]} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                    <button onClick={this[this.whereBShouldGo()]} className='options_b'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'}/>
                    </button>
                    <button onClick={this[this.whereCShouldGo()]} className='options_c'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'c'}/>
                    </button>
                </div>
            )
        }else if(this.props.z && this.props.a && this.props.b && !this.props.c && !this.props.d){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this[this.whereAShouldGo()]} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                    <button onClick={this[this.whereBShouldGo()]} className='options_b'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'b'}/>
                    </button> 
                </div>
            )
        }else if(this.props.z && this.props.a && !this.props.b && !this.props.c && !this.props.d){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this[this.whereAShouldGo()]} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                </div>
            )
        }else if(this.props.z && !this.props.a && !this.props.b && !this.props.c && !this.props.d){
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this.startOver} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                </div>
            ) 
        }else{
            return (
                <div className='scenario_and_options'>
                    <div className='the_scenario'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'z'}/>  
                    </div>
                    <button onClick={this.startOver} className='options_a'>
                        <Abcd zID={this.state.zCur} aID={this.props.id.adventure_id} oID={'a'}/>
                    </button>
                </div>
            )
        }
    }
    render(){
        // console.log(this.props.id.adventure_id)
        // console.log(this.state.aLoop) 
        // console.log(this.state.zCur)
        console.log(`scenario rendering`)
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