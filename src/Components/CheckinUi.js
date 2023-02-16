import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid, Menu } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Select from "react-select";

const drawerWidth = 240;

const active = {
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: 5,
};

function CheckInUi(props) {
    const [data, setData] = React.useState([]);
    const [customer, setCustomer] = useState();
    const [partNo, setPartNo] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [packingStandard, setPackingStandard] = useState();
    const [checkin, setCheckin] = useState();

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    // const fetchAllPartNos = () => {
    //     axios.get("http://localhost:2318/newentry").then((response) => {
    //         console.log("get data: "+ JSON.stringify(response.data));
    //         setData(response.data);
    //     })
    // };
    // console.log("part no: "+ JSON.stringify(data));
    // React.useEffect(() => {
    //   fetchAllPartNos();
    // }, []);

    // const handleChange = (e) => {
    //   e.preventDefault();
    //   useEffect(() => {
    //     axios.get('http://localhost:2318/newentry'). then((response) => {
    //       setCustomer(response.data.customer);
    //       setLocation(response.data.location);
    //       setDescription(response.data.description);
    //       setPackingStandard(response.data.packingStandard);
    //     })
    //   }, [])
    // }

    useEffect(() => {
      
      axios.get("http://localhost:2318/newentry").then((response) => {
            console.log("get data: "+ JSON.stringify(response.data.CustomerPartNo));
            setData(response.data);
            // console.log("Selectd part no: " + JSON.stringify(data.CustomerPartNo))
      axios.get(`http://localhost:2318/newentry/details/${response.data.CustomerPartNo}`). then((response) => {
        // setCustomer(response.data.customer);
        // setLocation(response.data.location);
        // setDescription(response.data.description);
        // setPackingStandard(response.data.packingStandard);
        console.log(response.data);
      }) })
    }, [])
    

    // console.log("customerPartno: "+ JSON.stringify(data));
    // console.log("single value " + data.CustomerPartNo[0]);
    
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Drawer = () => {
    const itemsList = [
        {
          path: "/",
          text: "Dashboard",
          icon: <DashboardIcon/>
        },
        {
          path:"/checkin",
          text: "Checkin",
          icon: <LeaderboardTwoToneIcon />
        },
        {
          path:"/checkout",
          text: "Checkout",
          icon: <InboxIcon/>
        },
        {
          path:"/addnew",
          text: "Utility",
          icon:<SettingsIcon/>
        },
        {
          path:"/logout",
          text: "Logout",
          icon: <LogoutIcon/>
        },
        {
          text: "Help",
          icon: <HelpIcon/>
        }
    ]
    return (
    <div >
      <Toolbar />
      {/* <Divider /> */}
      <List >
         {/* {itemsList.map((item, index) => {
            const {text, icon } = item;
            return (
                <ListItem button key={text}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                </ListItem>
            )
         })} */}
         {
                   itemsList.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}{item.text}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.text}</div>
                       </NavLink>
                   ))
               }
        </List>
    </div>
    )
          };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ background: 'white'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            background='white'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
           
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ color: 'blue'}} >
           CheckIn
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {Drawer}
        </Drawer>
        {/* <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {Drawer}
        </Drawer> */}
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid>
        <div className='container1-grid1'>
        <div className='container1-grid1-div'>
            <p>Customer Part No</p>
            <select  className='container-input' value={partNo} onChange={(e) => setPartNo(e.target.value)} >
                <option>Customer Part No</option>
                {data.map((options) => (
              <option key={options.id} value={options.CustomerPartNo}>
                {options.CustomerPartNo}
              </option>
            ))}
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Description</p>
            <select className='container-input' value={description} onChange={(e) => setDescription(e.target.value)}>
                <option>Description</option>
                {/* {description.map((options) => (
              <option key={options.Id} value={options.description}>
                {options.description}
              </option>
            ))} */}
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Packing Standard</p>
            <input className='container-input' value={packingStandard} onChange={(e) => setPackingStandard(e.target.value)} />
        </div>
        <div className='container1-grid1-div'>
            <p>Customer</p>
            <input className='container-input' value={customer} onChange={(e) => setCustomer(e.target.value)} readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>Location</p>
            <input className='container-input' value={location} onChange={(e) => setLocation(e.target.value)} readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>{packingStandard} to Checkin</p>
            <input className='container-input' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
        </div>
        <div className='container-btn-div'>
            <button className='checkin-btn'>Check In</button>
            <button className='barcode-btn'>Print Barcode</button>
        </div>
    </div>
    
        </Grid>
      </Box>
    </Box>
  );
}

CheckInUi.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default CheckInUi;