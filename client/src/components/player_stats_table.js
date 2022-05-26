import {AgGridReact} from "ag-grid-react";
import React, { useState } from 'react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function YearApiTableReg(props){
    
    const [rowData] = useState([
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxster", price: 72000}
]);

const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price', sortable: true }
])

return (
    <div className="ag-theme-balham" style={{height: 400, width: 600}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}>
        </AgGridReact>
    </div>
);
}