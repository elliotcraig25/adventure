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
        // console.log(this.props.thumbnail) 
        return (
            <Link to={`/play/${this.props.thumbnail.adventure_id}`}>
                <div key={this.props.thumbnail.adventure_id} className='thumbnail'>
                    <div className='thumbnail_title'>
                        {this.props.thumbnail.adventure_title}
                    </div>
                    <div className='thumbnail_user_name'>
                        {this.props.thumbnail.username}
                    </div>
                </div> 
            </Link>
        )
    }
}

export default Thumbnail