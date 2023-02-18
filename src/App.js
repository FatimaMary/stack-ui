import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddNew from './Components/AddNew';
import CheckIn from './Components/CheckIn';
import CheckInUi from './Components/CheckinUi';
import CheckOut from './Components/CheckOut';
import Dashboard from './Components/Dashboard';
import NewPartsEntry from './Components/NewPartsEntry';
import ProductAdd from './Components/ProductAdd';
import Sidebar from './Components/Sidebar';
import Utility from './Components/Utility';

function App() {
  return (
    // <div className="App">
    //   {/* <ProductAdd/> */}
    //   <NewPartsEntry/>
    //   {/* <CheckIn/> */}
    //   {/* <CheckInUi/> */}
    // </div>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/addnew' element={<AddNew/>} />
          <Route path='/checkin' element={<CheckIn/>} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='/utility' element={<Utility/>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
