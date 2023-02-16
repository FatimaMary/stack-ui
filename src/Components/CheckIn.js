import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CheckIn() {
  const [data, setData] = React.useState([]);
  const [details, setDetails] = useState([]);
    const [customer, setCustomer] = useState();
    const [selectedPartNo, setSelectedPartNo] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [packingStandard, setPackingStandard] = useState();
    const [binCount, setBinCount] = useState();
    const navigate = useNavigate();
    // const [searchParam] = useSearchParams();
    // const partNum = searchParam.get("partNo")

    useEffect(() => {
      axios.get("http://localhost:2318/newentry").then((response) => {
            console.log("get data: "+ JSON.stringify(response.data));
            setData(response.data);
      // if(selectedPartNo)
      // axios.get(`http://localhost:2318/newwntry/${selectedPartNo}`).then((response) => {
      //   setCustomer(response.data.Customer);
      //   setLocation(response.data.Location);


      // })
       })
    }, []);
    const handleChange = (e, value) => {
      setSelectedPartNo(e.target.value);
        // axios.get(`http://localhost:2318/newentry/customerPartNo${selectedPartNo}`). then((response) => {
        // setCustomer(response.Customer);
        // setLocation(response.Location);
        // // setDescription(response.description);
        // setPackingStandard(response.PackingStandard);
        // })
        console.log("data get via part no: " + JSON.stringify(selectedPartNo));
    }
    console.log(JSON.stringify(data) + "All data")

    console.log("selected part no: " + selectedPartNo)
    useEffect(() => {
      axios.get(`http://localhost:2318/newentry/customerPartNo${selectedPartNo}`). then((response) => {
        // setCustomer(response.Customer);
        // setLocation(response.Location);
        // // setDescription(response.description);
        // setPackingStandard(response.PackingStandard);
        setDetails(response.data)
        })
    }, []);
    console.log("Details of customer " + JSON.stringify(details))

    const handleCheckIn = (e) => {
      e.preventDefault();
      axios.post("http://localhost:2318/checkin", {
        CustomerPartNo: selectedPartNo,
        Action: `checkin`,
        BinCount: binCount,
        Location: location,
        // StockId: parseInt(Id),
      }).then((response) => {
        setSelectedPartNo("");
        setBinCount("");
        setLocation("");
        setPackingStandard("");
        setDescription("");
      })
    }

    console.log("Customer: " + JSON.stringify(details.Customer))

  return (
    <div className='container1-grid1'>
      <h2>CheckIn</h2>
        <div className='container1-grid1-div'>
            <p>Customer Part No</p>
            <select  className='container-input' value={selectedPartNo} 
            // onChange={(e) => setSelectedPartNo(e.target.value)}
            onChange={handleChange} 
            >
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
            <input className='container-input' value={details.PackingStandard} onChange={(e) => setPackingStandard(e.target.value)} re />
        </div>
        <div className='container1-grid1-div'>
            <p>Customer</p>
            <input className='container-input' value={details.Customer} onChange={(e) => setCustomer(e.target.value)} readOnly/>
        </div>
        <div className='container1-grid1-div'>
            <p>Location</p>
            <input className='container-input' value={details.Location} onChange={(e) => setLocation(e.target.value)} readOnly/>
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