import React from 'react';
import './sidebar.css';

import UserComponent from './sidebarComponents/userComponent/userComponent';
import SidebarLinks from './sidebarComponents/sidebarLinks/sidebarLinks';

const Sidebar = () => {
    return (         
            <div className='sidebar'>
                <UserComponent />
                <div className='links_container'>
                    <SidebarLinks />
                </div>
            </div>
    )
}

export default Sidebar;