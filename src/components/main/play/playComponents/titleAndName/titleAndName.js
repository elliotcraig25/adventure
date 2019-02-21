import React from 'react';

const TitleAndName = (props)=>{
    // const {title} = props
    // console.log(title)
    return (
        <div className='title_and_name'>
            <div>
                {props.title} 
            </div>
            <div>
                {props.user} 
            </div>
        </div>
    )
}

export default TitleAndName;