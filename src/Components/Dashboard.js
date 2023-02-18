import * as React from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { darken, lighten } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

export default function Dashboard() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2318/entry").then((response) => {
      setTableData(response.data);
    })
  }, []);
  console.log("tabledata " + JSON.stringify(tableData))


  const GotoAdd = () => {
    navigate("/addnew")
  }
  return (
    <div style={{ height: 500, width: "100%" }}>
      <div className="addbtn-div">
        <button onClick={GotoAdd} className="addnew-btn">Add New</button>
      </div>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .super-app-theme--Open": {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.info.main, theme.palette.mode),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.info.main,
                  theme.palette.mode
                ),
            },
          },
          "& .super-app-theme--Filled": {
            // width: 500,
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
            },
          },
          "& .super-app-theme--PartiallyFilled": {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.warning.main,
                theme.palette.mode
              ),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.warning.main,
                  theme.palette.mode
                ),
            },
          },
          "& .super-app-theme--Rejected": {
            bgcolor: (theme) =>
              getBackgroundColor(theme.palette.error.main, theme.palette.mode),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.error.main,
                  theme.palette.mode
                ),
            },
          },

          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.red": {
            backgroundColor: "red",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.blue": {
            backgroundColor: "blue",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.green": {
            backgroundColor: "green",
            color: "#1a3e72",
            fontWeight: "600",
          },
        }}
      >
        <DataGrid
          getRowClassName={(params) => `super-app-theme--${params.row.status}`}
          rows={tableData}
          getRowId={(row) => row.Id}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true, aggregation: true }}
          onCellEditStop={(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            aggregation: {
              model: {
                size: "sum",
                // updatedAt: "max",
              },
            },
          }}
        />
      </Box>
    </div>
  );
}

function CustomCellRenderer({ rows, columns }) {
  const percentage = rows[columns.field];
  let color = "";
  if (percentage < 50) {
    color = "red";
  } else if (percentage >= 50 && percentage < 80) {
    color = "yellow";
  } else {
    color = "green";
  }
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          padding: "8px",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const columns = [
  { field: "sno", headerName: "S.No", width: 100, 
  // editable: true 
},
  { field: "customer", headerName: "Customer", width: 180 },
  { field: "customerpartno", headerName: "Customer Part No", width: 180 },
  {
    field: "description",
    headerName: "Description",
    type: "text",
    width: 150,
    // 
  },
  {
    field: "location",
    headerName: "Location",
    type: "text",
    width: 90,
  },
  {
    field: "minstock",
    headerName: "Min Stock",
    type: "number",
    width: 90,
  },
  {
    field: "maxstock",
    headerName: "Max Stock",
    type: "number",
    width: 90,
  },
  {
    field: "currentstock",
    headerName: "Current Stock",
    type: "number",
    width: 100,
  },
  {
    field: "noofbins",
    headerName: "No.of Bins",
    type: "number",
    width: 100,
  },
  {
    field: "Levelindicator",
    headerName: "Level Indicator",
    type: "number",
    width: 180,
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        blue: params.value > 100000,
        red: params.value < 100000,
        green: params.value > 1000000,
      });
    },
    // 
    valueFormatter: ({ value }) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },

  // {
  //   field: "dateCreated",
  //   headerName: "Date Created",
  //   type: "date",
  //   width: 180,
  
  // },
  // {
  //   field: "lastLogin",
  //   headerName: "Last Login",
  //   type: "dateTime",
  //   width: 220,
    
  // },
  // {
  //   field: "percentage",
  //   headerName: "Percentage",
  //   type: "number",
  //   width: 90,
  //   // cellRenderer: CustomCellRenderer,
  //   cellClassName: (params) => {
  //     if (params.value === 60) {
  //       return (
  //         // <span style={{ bgcolor: "blue", width: `${params.value}%` }}>
  //         <div style={{ background: "red", width: "50%" }}>{params.value}</div>
  //       );
  //     }
  //   },
  //   // cellClassName: (params) => {
  //   //   if (params.value == null) {
  //   //     return "";
  //   //   }

  //   //   return clsx("super-app-theme", {
  //   //     60: params.value === 60,

  //   //   });
  //   // },
  //   // cellClassName: ({ value: percentage }) => {
  //   //   if (percentage > 60) {
  //   //     return (
  //   //       <div style={{ backgroundColor: "red", width: `${percentage}%` }}>
  //   //         {percentage}
  //   //       </div>
  //   //     );
  //   //   }
  //   // },
  // },
  // {
  //   field: "isfilled",
  //   headerName: "Is Filled",
  //   type: "boolean",
  //   width: 100,
  //   // 
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   type: "text",
  //   width: 200,
    
  //   cellClassName: (params) => {
  //     if (params.value == null) {
  //       return "";
  //     }

  //     return clsx("super-app-theme", {
  //       Filled: params.value === "Filled",
  //       Rejected: params.value === "Rejected",
  //       Open: params.value === "Open",
  //       PartiallyFilled: params.value === "PartiallyFilled",
  //     });
  //   },
  // },
  // // {
  // //   field: "size",
  // //   headerName: "Size",
  // //   type: "number",
  // //   width: 180,
  // //   valueFormatter: (params) => {
  // //     if (params.value == null) {
  // //       return "";
  // //     }
  // //     if (params.value < 100) {
  // //       return `${params.value} b`;
  // //     }

  // //     if (params.value < 1_000_000) {
  // //       return `${Math.floor(params.value / 100) / 10} Kb`;
  // //     }

  // //     if (params.value < 1_000_000_000) {
  // //       return `${Math.floor(params.value / 100_000) / 10} Mb`;
  // //     }

  // //     return `${Math.floor(params.value / 100_000_000) / 10} Gb`;
  // //   },
  // // },
];

// const rows = [
//   {
//     id: 1,
//     name: "Raja Traders",
//     city: "Virudhunagar",
//     commodity: "PVC Pipe",
//     price: 120,
//     quantity: 1000,
//     total: 120000,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     percentage: 80,
//     isfilled: true,
//     status: "PartiallyFilled",
//     // size: 900,
//   },
//   {
//     id: 2,
//     name: "Rani Impex",
//     city: "Chennai",
//     commodity: "Switch",
//     price: 25,
//     quantity: 100,
//     total: 25000,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     percentage: 20,
//     isfilled: true,
//     status: "Open",
//     // size: 25000,
//   },
//   {
//     id: 3,
//     name: "Bhuvana Exports",
//     city: "Kovilpatti",
//     commodity: "Plug",
//     price: 60,
//     quantity: 120,
//     total: 7200,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     percentage: 60,
//     isfilled: false,
//     status: "Rejected",
//     // size: 2450,
//   },
//   {
//     id: 4,
//     name: "Uma AutoMobiles",
//     city: "Sivakasi",
//     commodity: "PVC Pipe",
//     price: 1200,
//     quantity: 1000,
//     total: 1200000,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     percentage: 5,
//     isfilled: true,
//     status: "Filled",
//     // size: 1500,
//   },
//   {
//     id: 5,
//     name: "Pandi Chemicals",
//     city: "Tirupur",
//     commodity: "Wire",
//     price: 150,
//     quantity: 50,
//     total: 12500,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     percentage: 30,
//     isfilled: true,
//     status: "PartiallyFilled",
//     // size: 413,
//   },
// ];