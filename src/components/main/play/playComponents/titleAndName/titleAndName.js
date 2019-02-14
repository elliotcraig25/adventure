import React from 'react';

const TitleAndName = (props)=>{
    // const {title} = props
    // console.log(title)
    return (
        <div>
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