import axios from 'axios';
import React from 'react'
import { useState } from 'react';

function AddNew() {
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
          setCustomer("");
          setPartNo("");
          setDescription("");
          setLocation("");
          setMinstock("");
          setMaxstock("");
          setPackingStandard("");
        });
    }

    const clearEntries = () => {
        setCustomer("");
        setPartNo("");
        setDescription("");
        setLocation("");
        setMinstock("");
        setMaxstock("");
        setPackingStandard("");
      }

  return (
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
                <button className='discard-btn' onClick={clearEntries}>Discard</button>
                <button className='submit-btn' onClick={handleSubmit}>submit</button>
            </div>
        </div>
  )
}

export default AddNew