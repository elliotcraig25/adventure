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
    
    componentDidMount(){
        this.props.updateReduxZABCD()
    }

    componentDidUpdate(props){
        if(props!==this.props){ 
            this.getNewOptions()
            // this.resettingRedux()
        }
    }

    resettingRedux = ()=>{
        if(!this.props.z || !this.props.a || !this.props.b || !this.props.c || !this.props.d){
            this.props.updateReduxZABCD()
        }
    }

    getNewOptions = ()=>{
        if(this.props.aID){
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
                <div>Loading</div>
            )
        }else{
            return (
                <div>
                    {this.state.info[this.props.oID]}
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
    updateReduxZ,
    updateReduxA,
    updateReduxB,
    updateReduxC,
    updateReduxD,
    updateReduxZABCD
};
export default connect(mapToProps, dispatch)(Abcd);