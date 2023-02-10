import { Box} from '@mui/material';
import React from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import { useState } from 'react';
import axios from 'axios';
import './ProductAdd.css';

const drawerWidth = 200;

function CheckIn() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div" style={{ display: 'flex', justifyContent: 'center', nflexDirection:'row'}}>
            <div style={{fontSize: '36px'}}><AssignmentReturnOutlinedIcon/></div>
            <div>
              <div>Back To Product List</div>
              <div>Add New Product</div>
           </div>
          </Typography>
        </Toolbar>  */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List >
          {['Dashboard', 'Products', 'Checkin', 'Checkout', 'Reports'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
    <div className='container1-grid1'>
        <div className='container1-grid1-div'>
            <p>Customer Part No</p>
            <select>
                <option>Customer Part No</option>
                <option></option>
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Description</p>
            <select>
                <option>Description</option>
                <option></option>
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Packing Standard</p>
            <input readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>Customer</p>
            <input readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>Location</p>
            <input readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>Bins to Checkin</p>
            <input readOnly/>
        </div>
        <div>
            <button>Generate Barcodes</button>
            <button>Print Barcodes</button>
            <button>Complete Checkin</button>
        </div>
    </div>
    </Box>
    </Box>
  )
}

export default CheckIn