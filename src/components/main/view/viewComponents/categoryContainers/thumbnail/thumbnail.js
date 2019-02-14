import React from 'react';
import './thumbnail.css';
import {Link} from 'react-router-dom';

class Thumbnail extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };
    render(){
        console.log(this.props.thumbnail) 
        return (
            <Link to='/play'>
                <div key={this.props.thumbnail.adventure_id} className='thumbnail'>
                    <div>
                        {this.props.thumbnail.adventure_title}
                    </div>
                    <div>
                        {this.props.thumbnail.username}
                    </div>
                </div> 
            </Link>
        )
    }
}

export default Thumbnail