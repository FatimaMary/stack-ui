import React from 'react'
import Box from '@mui/material/Box';
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

function NewPartsEntry() {
    const [customer, setCustomer] = useState();
    const [partNo, setPartNo] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [minstock, setMinstock] = useState();
    const [maxstock, setMaxstock] = useState();
    const [packingStandard, setPackingStandard] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(Validation(enquiryEntries));
        axios.post("http://localhost:2318/newentry", {
          Customer: customer,
          CustomerPartNo: partNo,
          Description: description,
          Location: location,
          MinStock: minstock,
          MaxStock: maxstock,
          PackingStandard: packingStandard
        }).then((res) => {
          console.log(res);
        //   navigate("/table")
        });
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" style={{ display: 'flex', justifyContent: 'center', nflexDirection:'row'}}>
            <div style={{fontSize: '36px'}}><AssignmentReturnOutlinedIcon/></div>
            {/* <div> <-</div> */}
            <div>
              <div>Back To Product List</div>
              <div>Add New Product</div>
           </div>
          </Typography>
        </Toolbar> 
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
                <p className='container1-grid1-p'>Customer</p>
                <input  className='container1-grid1-input' type='text' name='customer' value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Customer Part No</p>
                <input  className='container1-grid1-input' type='text' name='customerpartno' value={partNo} onChange={(e) => setPartNo(e.target.value)} />
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Description</p>
                <textarea className='container1-grid1-input' name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Location</p>
                <input className='container1-grid1-input' type='text' name='location' value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Min Stock</p>
                <input className='container1-grid1-input' type='text' name='minstock' value={minstock} onChange={(e) => setMinstock(e.target.value)}/>
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Max Stock</p>
                <input className='container1-grid1-input' type='text' name='maxstock' value={maxstock} onChange={(e) => setMaxstock(e.target.value)}/>
            </div>
            <div className='container1-grid1-div'>
                <p className='container1-grid1-p'>Packing Standard</p>
                <select className='container1-grid1-input' name='packingStandard' value={packingStandard} onChange={(e) => setPackingStandard(e.target.value)}>
                    <option>Packing Standard</option>
                    <option>Pocket</option>
                    <option>Bin</option>
                </select>
            </div>
            <div className='container1-grid1-div'>
                <button className='discard-btn'>Discard</button>
                <button className='submit-btn' onClick={handleSubmit}>submit</button>
            </div>
        </div>
      </Box>
    </Box>
  )
}

export default NewPartsEntry