import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function CheckIn() {
  const [data, setData] = React.useState([]);
    const [customer, setCustomer] = useState();
    const [partNo, setPartNo] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [packingStandard, setPackingStandard] = useState();
    const [binCount, setBinCount] = useState();

    useEffect(() => {
      
      axios.get("http://localhost:2318/newentry").then((response) => {
            console.log("get data: "+ JSON.stringify(response.data));
            setData(response.data);
            // console.log("Selectd part no: " + JSON.stringify(data.CustomerPartNo))
      // axios.get("")
      axios.get(`http://localhost:2318/newentry/details/${partNo}`). then((response) => {
        setCustomer(response.customer);
        setLocation(response.location);
        setDescription(response.description);
        setPackingStandard(response.packingStandard);
        console.log("data get via part no: " + response.data);
      }) })
    }, []);

    const handleCheckIn = (e) => {
      e.preventDefault();
      axios.post("http://localhost:2318/checkin", {
        CustomerPartNo: partNo,
        Action: `checkin`,
        BinCount: binCount,
        Location: location,
        // StockId: parseInt(Id),
      }).then((response) => {
        setPartNo("");
        setBinCount("");
        setLocation("");
        setPackingStandard("");
        setDescription("");
      })
    }

  return (
    <div className='container1-grid1'>
      <h2>CheckIn</h2>
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
                <option></option>
                {/* {description.map((options) => (
              <option key={options.Id} value={options.description}>
                {options.description}
              </option>
            ))} */}
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Packing Standard</p>
            <input className='container-input' value={packingStandard} onChange={(e) => setPackingStandard(e.target.value)} re />
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
            <input className='container-input' value={binCount} onChange={(e) => setBinCount(e.target.value)} />
        </div>
        <div className='container-btn-div'>
            <button className='checkin-btn' onClick={handleCheckIn} >CheckIn</button>
            <button className='barcode-btn'>Print Barcode</button>
        </div>
    </div>
  )
}

export default CheckIn