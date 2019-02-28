import React from 'react';

const TitleAndName = (props)=>{
    // const {title} = props
    // console.log(title)
    return (
        <div className='title_and_name'>
            <div className='title_and_name_title'>
                {props.title} 
            </div>
            <div className='title_and_name_name'>
                Created by {props.user} 
            </div>
        </div>
    )
}

export default TitleAndName;