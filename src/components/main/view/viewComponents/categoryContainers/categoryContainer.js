import React from 'react';
import './categoryContainer.css';
import Thumbnail from './thumbnail/thumbnail';

class CatgoryContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    createThumbnail = ()=>{
        let thumbNail = this.props.thumbNailInfo.map((ele, i)=>{
            return (
                <Thumbnail thumbnail={ele} key={i}/>
            )
        })
        return thumbNail
    }
    render(){
        // console.log(this.props.thumbNailInfo)
        return (
            <div className='category_container'>
                <div className='category_child'>
                    <div className='category_title'>
                        {this.props.thumbNailInfo[0].category_title}<br/>
                    </div>
                    <div className='thumbnail_container'>
                        {this.createThumbnail()}
                    </div>
                </div>
            </div>
        )
    } 
}

export default CatgoryContainer