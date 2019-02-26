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
    
    componentDidUpdate(props){
        if(props!==this.props){
            this.getNewOptions()
        } 
    }
    
    getNewOptions = ()=>{
        // console.log(`zID:`, this.props.zID)
        // console.log(`aID:`, this.props.aID)
        if(this.props.aID){
            // this.props.updateReduxZABCD()
            return(                
                axios.get(`/api/abcdoption/${this.props.aID}/${this.props.zID}`) 
                .then((res)=>{                    
                    // console.log(res.data);
                    this.setState({info: res.data})
                    if(!res.data.z){
                        this.props.updateReduxZ({z: false})
                    }
                    if(!res.data.a){
                        this.props.updateReduxA({a: false})
                    }
                    if(!res.data.b){
                        this.props.updateReduxB({b: false})
                    }
                    if(!res.data.c){
                        this.props.updateReduxC({c: false})
                    }
                    if(!res.data.d){
                        this.props.updateReduxD({d: false})
                    } 
                })
            )
        }
    }
    whatToRender = ()=>{
        if(this.state.info.z_type === 'default'){
            return (
                <div>
                    {this.state.info[this.props.oID]} 
                </div>
            )
        }else if(!this.state.info.z_type){
            return (                
                <div>123123123</div>
            )
        }else{
            return (
                <div>
                    It's not default
                </div>
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
        d: reduxState.d 
    }
};
const dispatch = {
    updateReduxZABCD,
    updateReduxZ,
    updateReduxA,
    updateReduxB,
    updateReduxC,
    updateReduxD
};
export default connect(mapToProps, dispatch)(Abcd);