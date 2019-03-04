import React from 'react';

class SidebarLinks extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div className='sidebar_links'>
                <div>Home</div><br/>
                <div>Make</div><br/>
                <div>Choose</div><br/>
            </div>
        )
    }
}

export default SidebarLinks;