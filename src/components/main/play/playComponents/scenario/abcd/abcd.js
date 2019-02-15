import React from 'react';
import axios from 'axios';

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
            return(                
                axios.get(`/api/abcdoption/${this.props.aID}/${this.props.zID}`) 
                .then((res)=>{
                    // console.log(res.data);
                    this.setState({info: res.data})
                })
            )
        }
    }  
    render(){
        // console.log(this.state.info)
        return (
            <div>
                {this.state.info[this.props.oID]} 
            </div>
        )
    }
}

export default Abcd;