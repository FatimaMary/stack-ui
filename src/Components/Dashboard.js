import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate();

    const GoTOAddProduct = () => {
        navigate("/addnew")
    }

  return (
    <div>
        <Button varient='outlined' onClick={GoTOAddProduct}> Add New Product</Button>
    </div>
  )
}

export default Dashboard;