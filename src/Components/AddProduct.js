import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InputBase from '@mui/material/InputBase';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import NativeSelect from '@mui/material/NativeSelect';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import { useState } from 'react';


const drawerWidth = 200;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 10px ',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Health & Medicine',
  'Beauty',
  'Home & Kitchen',
  'Kitchen & Dining',
  'Household',
  'Baby Care',
  'Clothing',
  'Shoes',
];

const products = [
  'Health & Medicine',
  'Beauty',
  'Home & Kitchen',
  'Kitchen & Dining',
  'Household',
  'Baby Care',
  'Clothing',
  'Shoes',
];

function getStyles(name, product, theme) {
    return {
      fontWeight:
        product.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function getStyledFun(name, category, theme) {
    return {
      fontWeight:
        category.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



export default function AddProduct() {
    const theme = useTheme();
    const [name, setName] = useState();
    const [discription, setDiscription] = useState();
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
  
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            Description
          <Item>
          <FormControl sx={{ m: 1, }} variant="outlined">
          <FormHelperText id="outlined-weight-helper-text">Name</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'name',
                style: {
                  height: '8px'
                }
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{width: 400, fontWeight: 'bold'}}
            />
          </FormControl>
          <FormControl sx={{ m: 1, }} variant="outlined">
          <FormHelperText id="outlined-weight-helper-text" >Business Description</FormHelperText>
            <OutlinedInput
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                // 'aria-label': 'name',
              
              style: {
                height: "25px",
              },}}
              sx={{width: 400, fontWeight: 'bold'}}
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </FormControl>
          </Item>
        </Grid>
        <Grid item xs={6} >
            Product Images <HelpOutlineIcon/>
          <Item sx={{height: 150, }}>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
          </Item>
        </Grid>
        <div>
        <Grid item xs={6}>
        Category
          <Item>
          <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label">Product Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          style={{height: '40px'}}
        //   multiple
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          input={<OutlinedInput label="Product Category" />}
          // MenuProps={MenuProps}
        >
          {categories.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyledFun(name, category, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label">Product Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          style={{height: '40px'}}
        //   multiple
          value={product}
          onChange={(e)=> setProduct(e.target.value)}
          input={<OutlinedInput label="Product Category" />}
          MenuProps={MenuProps}
        >
          {products.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, product, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Item>
        </Grid>
        </div>
        <Grid item xs={6}>
          Shipping And Delivery
          <Item>
          <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">Items Weight</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          sx={{width: 400}}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      <div>
        Package Size(The Package you use to ship your product)
      </div>
      <div>
      <FormControl sx={{ m: 1, width: '17ch' }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">Length</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">in</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              style: {height: '10px'}
            }}
            value={length}
              onChange={(e) => setLength(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '17ch' }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">Breadth</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">in</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              style: {height: '10px'}
            }}
            value={breadth}
              onChange={(e) => setBreadth(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '17ch' }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">Width</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">in</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              style: {height: '10px'}
            }}
            value={width}
              onChange={(e) => setWidth(e.target.value)}
          />
        </FormControl>
      </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
            Inventary
          <Item style={{textAlign: 'left', display: 'flex',}}>
            <div>
          Quantity
                <FormControl sx={{ width: '20ch' }}>
                    <OutlinedInput style={{height: '40px'}} 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}/>
                </FormControl>
            </div>
            <div>
            SKU(optional)
                <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput style={{height: '40px'}}
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}/>
                </FormControl>
            </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
          Pricing
          <Item>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">Price</FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            startAdornment={<InputAdornment position="start"><AttachMoneySharpIcon style={{fontSize: '20px'}}/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              style:{height: '10px'}
            }}
            value={price}
              onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">Compare at Price<HelpOutlineIcon style={{fontSize: '13px'}}/> </FormHelperText>
          <OutlinedInput
            id="outlined-adornment-weight"
            startAdornment={<InputAdornment position="start"><AttachMoneySharpIcon style={{fontSize: '20px'}}/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
              style:{height: '10px'}
            }}
            value={compareprice}
              onChange={(e) => setCompareprice(e.target.value)}
          />
        </FormControl>
          </Item>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button style={{margin: 10}} variant="outlined" >Discard</Button>
          <Button style={{margin: 10}} variant="contained">Add Product</Button>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}