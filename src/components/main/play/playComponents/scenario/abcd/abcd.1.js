//

import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateReduxZ, updateReduxA, updateReduxB, updateReduxC, updateReduxD, updateReduxZABCD} from '../../../../../../ducks/reducer';

class Abcd extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            zID: this.props.zID,
            oID: this.props.oID,
            aID: 0,
            info: {} 
        }
    }

    componentDidMount(){
        this.setState({aID: this.props.aID})
    }

    componentDidUpdate(prevProps, prevState){        
        if(prevProps!==this.props){ 
            // console.log('abcd: in componenet did update')
            // console.log('abcd prevProps', prevProps)
            // console.log('abcd this.props', this.props)
            this.getNewOptions()
        }
    }

    getNewOptions = ()=>{
        if(this.props.aID && this.props.zID && this.props.oID === 'z'){
            // console.log(`${this.props.oID}: get new options is running`) 
            axios.get(`/api/abcdoption/${this.props.aID}/${this.props.zID}`) 
            .then((res)=>{
                this.setState({info: res.data})
                if(!res.data.z){
                    this.props.updateReduxZ({z: false})
                }else{
                    this.props.updateReduxZ({z: true, zText: res.data.z, aText: res.data.a, bText: res.data.b, cText: res.data.c, dText: res.data.d, z_type: res.data.z_type})
                }
                if(!res.data.a){
                    this.props.updateReduxA({a: false})
                }else{
                    this.props.updateReduxA({a: true})
                }
                if(!res.data.b){
                    this.props.updateReduxB({b: false})
                }else{
                    this.props.updateReduxB({b: true})
                }
                if(!res.data.c){
                    this.props.updateReduxC({c: false})
                }else{
                    this.props.updateReduxC({c: true})
                }
                if(!res.data.d){
                    this.props.updateReduxD({d: false})
                }else{
                    this.props.updateReduxD({d: true})
                }
            }).catch(err=>(console.log(err)))
        }
    }
    whatToRender = ()=>{
        if(!this.props.z_type){
            return (
                <div>Loading</div>
            )
        }else if(this.props.z_type === 'default' && this.props[`${this.props.oID}Text`]){
            return (
                <div>
                    {this.props[`${this.props.oID}Text`]}
                </div>
            )
        }else if(this.props.z_type.split(' ')[0] === 'loop'){
            return (
                <div>
                    {this.props[`${this.props.oID}Text`]}
                </div>
            )
        }else{
            return (
                <div>Start Over</div>
            )
        }
    }
    render(){
        // console.log(`abcd rendering`)
        return (
            <div>
                {this.whatToRender()}
            </div>
        )
    }
}
const mapToProps = reduxState => {
    return {
        z: reduxState.z,
        a: reduxState.a,
        b: reduxState.b,
        c: reduxState.c,
        d: reduxState.d,
        zText: reduxState.zText,
        aText: reduxState.aText,
        bText: reduxState.bText,
        cText: reduxState.cText,
        dText: reduxState.dText,
        z_type: reduxState.z_type
    }
};
const dispatch = {
    updateReduxZ,
    updateReduxA,
    updateReduxB,
    updateReduxC,
    updateReduxD,
    updateReduxZABCD
};
export default connect(mapToProps, dispatch)(Abcd);