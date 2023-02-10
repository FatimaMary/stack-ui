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
import { Grid } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Drawer = () => {
    const itemsList = [
        {
            text: "Dashboard",
            icon: <InboxIcon/>
        },
        {
            text: "Checkin",
            icon: <InboxIcon/>
        },
        {
            text: "Checkout Utility",
            icon: <InboxIcon/>
        },
        {
            text: "Message",
            icon: <InboxIcon/>
        },
        {
            text: "Layout",
            icon: <InboxIcon/>
        },
        {
            text: "Help",
            icon: <InboxIcon/>
        }
    ]
    return (
    <div >
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <List >
         {itemsList.map((item, index) => {
            const {text, icon } = item;
            return (
                <ListItem button key={text}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                </ListItem>
            )
         })}
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
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
    
        </Grid>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;