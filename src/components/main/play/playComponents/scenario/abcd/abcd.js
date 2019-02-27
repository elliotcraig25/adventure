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
            aID: this.props.aID,
            info: {}
        }
    }
    
    // componentDidMount(){
    //     this.getNewOptions()
    // }

    componentDidUpdate(prevProps, prevState){
        console.log('hitting in abcd componenet did update')
        if(prevProps!==this.props){ 
            console.log('inside hitting in abcd componenet did update')
            this.getNewOptions()
            // this.resettingRedux()
        }
        // if(prevState.zID!==this.state.zID){
        //     this.getNewOptions()
        //     // this.resettingRedux()
        // }
    }

    // resettingRedux = ()=>{
    //     if(!this.props.z || !this.props.a || !this.props.b || !this.props.c || !this.props.d){
    //         this.props.updateReduxZABCD()
    //     }
    // }

    getNewOptions = ()=>{
        if(this.props.aID && this.props.zID){
            console.log('does this one here hit??')
            // return(
                axios.get(`/api/abcdoption/${this.props.aID}/${this.props.zID}`) 
                .then((res)=>{                    
                    console.log(res.data);
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
            // )
        }
    }
    whatToRender = ()=>{
        if(!this.props.z_type){
            console.log(`hitting in undefined ${this.state.oID}`) 
            return (                
                <div>Loading</div>
            )
        }else if(this.props.z_type === 'default'){
            console.log(`hitting in default ${this.state.oID}`) 
            return (
                <div>
                    {this.props[`${this.props.oID}Text`]}
                </div>
            )
        }else if(this.props.z_type.split(' ')[0] === 'loop'){
            console.log(`hitting in loop ${this.state.oID}`)
            return (                
                <div>
                    {this.props[`${this.props.oID}Text`]}
                </div>
            )
        }else{
            return (                
                <div>Nothing Else Loading</div>
            )
        }
    }
    render(){
        // console.log(this.state.info)
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