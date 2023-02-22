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
import './ProductAdd.css'
const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

export default function Utility() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2318/entry").then((response) => {
      console.log("TableData: " + JSON.stringify(response.data));
      setTableData(response.data);
    })
  }, []);
  // console.log("tabledata " + JSON.stringify(tableData))
  return (
    <div style={{ height: 500, width: "100%" }}>
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
  { field: "Id", headerName: "S.No", width: 100,
  filterable: false, renderCell: (index) => index.api.getRowIndex(index.row.Id) + 1,
  editable: true 
},
  { field: "Customer", headerName: "Customer", width: 180, editable: true },
  { field: "CustomerPartNo", headerName: "Customer Part No", width: 150, editable: true },
  {
    field: "Description",
    headerName: "Description",
    type: "string",
    width: 180,
    editable: true
  },
  {
    field: "Location",
    headerName: "Location",
    type: "string",
    width: 90,
    editable: true
  },
  {
    field: "MinStock",
    headerName: "Min Stock",
    type: "number",
    width: 90,
    editable: true
  },
  {
    field: "MaxStock",
    headerName: "Max Stock",
    type: "number",
    width: 90,
    editable: true
  },
  {
    field: "currentstock",
    headerName: "Current Stock",
    type: "number",
    width: 100,
    editable: true
  },
  {
    field: "noofbins",
    headerName: "No.of Bins",
    type: "number",
    width: 100,
    editable: true
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

