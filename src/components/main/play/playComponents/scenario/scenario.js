import React from 'react';

class Scenario extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: '0'
        }
    }
    componentDidMount(){
        this.setState({
            id: this.props.id.adventure_id
        })
    }
    render(){
        // console.log(this.props.id.adventure_id)
        console.log(this.state.id)
        return (
            <div>
                Scenario and Options
                <div>
                    state {this.state.id}
                </div>
                <div>
                    props {this.props.id.adventure_id}
                </div>
            </div>
        )
    }
}

export default Scenario