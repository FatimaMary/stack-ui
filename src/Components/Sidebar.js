import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import { FaBars } from 'react-icons/fa'

const Sidebar = ({children}) => {
    const [value, setValue] = React.useState(0);
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<DashboardIcon/>
        },
        {
            path:"/checkin",
            name:"CheckIn",
            icon:<LeaderboardTwoToneIcon />
        },
        {
            path:"/checkout",
            name:"CheckOut",
            icon:<LogoutIcon/>
        },
        {
            path:"/utility",
            name:"Utility",
            icon:<SettingsIcon/>
        },
        {
            path:"/logout",
            name:"Logout",
            icon:<LogoutIcon/>
        },
        {
            path:"/help",
            name:"Help",
            icon:<HelpIcon/>
        },
    ]
    return (
        <div className="container" >
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Borcelle</h1>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    <FaBars onClick={toggle}  />
                </div>
            </div>
            {
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
           </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;