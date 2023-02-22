import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchable from 'react-searchable-dropdown';
import Select from 'react-select';



function CheckIn() {
  const [customerPartDetails, setCustomerPartDetails] = useState([]);
    const [customer, setCustomer] = useState();
    const [partNo, setPartNo] = useState();
    const [selectedPartNo, setSelectedPartNo] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [packingStandard, setPackingStandard] = useState();
    const [binCount, setBinCount] = useState();
    const [selectdId, setSelectdId] = useState();
    const navigate = useNavigate();    

    useEffect(() => {
      axios.get("http://localhost:2318/entry").then((response) => {
            setCustomerPartDetails(response.data);
       })
    }, []);

    // const handleChange = (e, data) => {
    //   setSelectedPartNo(data);
    //   console.log("data get via part no: " + JSON.stringify(data));
    //   customerPartDetails.filter((singleCustomerPartDetail) => {
    //       if(data === singleCustomerPartDetail.CustomerPartNo) {
    //         setDescription(singleCustomerPartDetail.Description)
    //         setCustomer(singleCustomerPartDetail.Customer);
    //         setPackingStandard(singleCustomerPartDetail.PackingStandard);
    //         setLocation(singleCustomerPartDetail.Location);
    //         setSelectdId(singleCustomerPartDetail.Id)
    //           console.log("Description: " + singleCustomerPartDetail.Description)
    //           console.log("ID: "+singleCustomerPartDetail.Id);
    //       } else if  (e.target.value === singleCustomerPartDetail.Description) {
    //         setSelectedPartNo(singleCustomerPartDetail.CustomerPartNo)
    //         setCustomer(singleCustomerPartDetail.Customer);
    //         setPackingStandard(singleCustomerPartDetail.PackingStandard);
    //         setLocation(singleCustomerPartDetail.Location);
    //         setSelectdId(singleCustomerPartDetail.Id)
    //       }
    //   })
    // }

    function handleSelect(data) {
      setPartNo(data);
      setSelectedPartNo(data.value);
      console.log(data);
      console.log("selected part no: " + JSON.stringify(selectedPartNo))
      customerPartDetails.filter((singleCustomerPartDetail) => {
        if(data.value === singleCustomerPartDetail.CustomerPartNo) {
          setDescription(singleCustomerPartDetail.Description)
          setCustomer(singleCustomerPartDetail.Customer);
          setPackingStandard(singleCustomerPartDetail.PackingStandard);
          setLocation(singleCustomerPartDetail.Location);
          setSelectdId(singleCustomerPartDetail.Id)
        }})
    }

    const optionsList = customerPartDetails.map((opt) => ({
      label: opt.CustomerPartNo , 
      value: opt.CustomerPartNo,
    }
    ))
    // console.log("Options List:" + JSON.stringify(optionsList))

    const handleCheckIn = (e) => {
      e.preventDefault();
      axios.post("http://localhost:2318/activity", {
        CustomerPartNo: selectedPartNo,
        Action: `checkin`,
        BinCount: binCount,
        Location: location,
        StockId: selectdId,
        
      }).then((response) => {
        console.log(response);
        setSelectedPartNo("");
        setPartNo("");
        setCustomer("");
        setBinCount("");
        setLocation("");
        setPackingStandard("");
        setDescription("");
      })
      
    }
    console.log("selected part no: "+selectedPartNo)
  return (
    <div className='container1-grid1'>
      <h2>CheckIn</h2>
        <div className='container1-grid1-div'>
            <p>Customer Part No</p>
            <Select
              className='container-select'
              placeholder="select Part No"
              value={partNo} 
              onChange={handleSelect}
              // onChange={(e) => setSelectedPartNo(e.value)} 
               options = {optionsList} 
               isSearchable={true}
            />
            {/* <select className='container-input' value={selectedPartNo} 
            onChange={handleChange}>
              <option>Select....</option>
              {customerPartDetails.map((singleCustomerPart) => (
              <option key={singleCustomerPart.Id} value={singleCustomerPart.CustomerPartNo}>
                {singleCustomerPart.CustomerPartNo}
               </option>
              ))}
            </select> */}
        </div>
        <div className='container1-grid1-div'>
            <p>Description</p>
            <select className='container-input' value={description} 
            // onChange={handleChange}
            onChange={(e) => setDescription(e.target.value)}
            >
                <option>Description</option>
                {customerPartDetails.map((singleDescription) => (
              <option key={singleDescription.Id} value={singleDescription.Description}>
                {singleDescription.Description}
              </option>
            ))}
            </select>
        </div>
        <div className='container1-grid1-div'>
            <p>Packing Standard</p>
            <input className='container-input' value={packingStandard} onChange={(e) => setPackingStandard(e.target.value)} readOnly />
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