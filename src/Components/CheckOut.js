import React from 'react';
import { useState } from 'react';
import './CheckOut.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';;



const columns = [
  { 
    id: 'sno', 
    label: 'S.No', 
    minWidth: 100, 
    align: 'center' 
  },
  { 
    id: 'CustomerPartNo', 
    label: 'Customer Part No', 
    minWidth: 130, 
    align: 'left'
  },
  {
    id: 'Description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'binValue',
    label: 'No.of Bins',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'to Checkout',
    label: 'to Checkout',
    minWidth: 120,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [];


export default function CheckOut() {
  const [customerPartNo, setCustomerPartNo] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='checkout-container'>
      <div className='checkout-partno'>
        <div className='checkout-partno-div'>
          <label>Customer Part Number</label>
          <input className='checkout-partno-div-input' value={customerPartNo} onChange={(e) => setCustomerPartNo(e.target.value)} />
        </div>
        <div >
          <button className='checkout-partno-btn'>Submit</button>
        </div>
      </div>
      <div className='checkout-table'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </div>
      <div className='checkout-button-div'>
        <button className='checkout-button-div-btn'>CheckOut</button>
      </div>
    </div>
  );
}