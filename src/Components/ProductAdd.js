import * as React from 'react';
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
import Grid from '@mui/material/Grid';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import NativeSelect from '@mui/material/NativeSelect';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import { useState } from 'react';
import axios from 'axios';
import './ProductAdd.css';


const drawerWidth = 200;


const categories = [
  {value: "Health & Medicine ", text:'Health & Medicine'},
  {value: "Beauty ", text:'Beauty'},
  {value: "Home & Kitchen", text:'Home & Kitchen'},
  {value: "Kitchen & Dining ", text:'Kitchen & Dining'},
  {value: "Household ", text:'Household'},
  {value: "Baby Care ", text:'Baby Care'},
  {value: "Clothing ", text:'Clothing'},
  {value: "Shoes ", text:'Shoes'},
];

const products = [
  {value: "Health & Medicine ", text:'Health & Medicine'},
  {value: "Beauty ", text:'Beauty'},
  {value: "Home & Kitchen ", text:'Home & Kitchen'},
  {value: "Kitchen & Dining", text:'Kitchen & Dining'},
  {value: "Household ", text:'Household'},
  {value: "Baby Care ", text:'Baby Care'},
  {value: "Clothing ", text:'Clothing'},
  {value: "Shoes ", text:'Shoes'},
];


export default function ProductAdd() {
    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [sku, setSku] = useState();
    const [length, setLength] = useState();
    const [breadth, setBreadth] = useState();
    const [width, setWidth] = useState();
    const [price, setPrice] = useState();
    const [compareprice, setCompareprice] = useState();
    const [category, setCategory] = useState();
    const [product, setProduct] = useState();
  // const [personName, setPersonName] = React.useState([]);
  const [weight, setWeight] = React.useState('');

  const clearEntries = () => {
    setProductName("");
      setDescription("");
      setQuantity("");
      setSku("");
      setLength("");
      setBreadth("");
      setWidth('');
      setPrice("");
      setWeight("");
      setCompareprice("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2318/", {
      ProductName: productName,
      Description: description,
      Category: category,
      Quantity: quantity,
      Sku: sku,
      Length: length,
      Breadth: breadth,
      Width: width,
      Price: price,
      Weight: weight,
      ComparePrice: compareprice,
    }).then((response) => {
      console.log(response);
      setProductName("");
      setDescription("");
      setQuantity("");
      setSku("");
      setLength("");
      setBreadth("");
      setWidth('');
      setPrice("");
      setWeight("");
      setCompareprice("");
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            <div><AssignmentReturnOutlinedIcon/>Back To Product List</div>
           <div>Add New Product</div>
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
        <div className='addproduct-container1'>
        <Grid item xs={6} className='container1-grid1'>
            <h4>Description</h4>
            <div className='container1-grid1-div'>
              {/* <div className='container1-grid1-subdiv'> */}
                <p className='container1-grid1-p'>Product Name</p>
                <input className='container1-grid1-input' name='name' value={productName} onChange={(e) => setProductName(e.target.value)}/>
              {/* </div> */}
              <div>
                <p>Business Description</p>
                <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
        </Grid>
        <Grid item xs={6} >
            <h4>Category</h4>
            <div>
                <p>Product Category</p>
                <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((options) => (
                <option key={options.value} value={options.value}>
                  {options.text}
                </option>
              ))}
                </select>
                <p>Product Category</p>
                <select name='product' value={product} onChange={(e) => setProduct(e.target.value)}>
                {products.map((options) => (
                <option key={options.value} value={options.value}>
                  {options.text}
                </option>
              ))}
                </select>
            </div>
        </Grid>
        <Grid item xs={6}>
            <h4>Inventary</h4>
            <div>
                <div>
                    <p>Quantity</p>
                    <input name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div>
                    <p>SKU(optional)</p>
                    <input name='sku' value={sku} onChange={(e) => setSku(e.target.value)}/>
                </div>
            </div>
        </Grid>
        </div>
        <div className='addproduct-container2'>
        <Grid item xs={6}>
           <h4>Product Images<HelpOutlineIcon/></h4>
           <div></div>
        </Grid>
        <Grid item xs={6}>
            <h4>Shipping and Delivery</h4>
            <div>
                <div>
                    <p>Items Weight</p>
                    <input name='weight' value={weight} onChange={(e) => setWeight(e.target.value)}/>
                </div>
                <div>
                    <h4>Package Size(The Package you use to ship your product)</h4>
                    <div>
                        <div>
                            <p>Length</p>
                            <input name='length' value={length} onChange={(e) => setLength(e.target.value)}/>
                        </div>
                        <div>
                            <p>Breadth</p>
                            <input name='breadth' value={breadth} onChange={(e) => setBreadth(e.target.value)}/>
                        </div>
                        <div>
                            <p>Width</p>
                            <input name='width' value={width} onChange={(e) => setWidth(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
        <Grid item xs={6}>
          <h4>Pricing</h4>
          <div>
            <div>
                <p>Price</p>
                <input name='price' value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div>
                <p>Compare at Price<HelpOutlineIcon/></p>
                <input name='compareprice' value={compareprice} onChange={(e) => setCompareprice(e.target.value)}/>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}> 
            <button onClick={clearEntries}>Discard</button>
            <button onClick={handleSubmit}>Add Product</button>
        </Grid>
        </div>
      </Grid>
      </Box>
    </Box>
  );
}