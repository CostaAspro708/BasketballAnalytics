import {usePlayers} from "./API/player.js";

import {AgGridReact} from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from 'react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export function YearApiTableReg(props){
    const gridRef = useRef();

    const table = {
        columns: [
            { headerName: "Name", field: "name" },
            { headerName: "Fantasy Points", field: "fantasy",width:100},
            { headerName: "Position", field: "position",width:100},
            { headerName: "Age", field: "age", width:50},
            { headerName: "Team", field: "team",width:60},
            { headerName: "Played", field: "games",width:70},
            { headerName: "Started", field: "started",width:85},
            { headerName: "MP", field: "mp",width:60},
            { headerName: "FG", field: "fg",width:60},
            { headerName: "FGA", field: "fga",width:60},
            { headerName: "FG%", field: "fgp",width:60},
            { headerName: "3", field: "three_made",width:60},
            { headerName: "3A", field: "three_attempts",width:60},
            { headerName: "3%", field: "three_percent",width:60},
            { headerName: "FT", field: "ft",width:60},
            { headerName: "FTA", field: "fta" ,width:60},
            { headerName: "FT%", field: "ftp" ,width:60},
            //{ headerName: "ORB", field: "orb" ,width:60},
            //{ headerName: "DRB", field: "drb" ,width:60},
            { headerName: "TRB", field: "trb" ,width:60},
            { headerName: "A", field: "ass" ,width:60},
            { headerName: "STL", field: "stl" ,width:60},
            { headerName: "BLK", field: "blk",width:60 },
            { headerName: "TOV", field: "tov" ,width:60},
            { headerName: "PF", field: "pf",width:60},
            { headerName: "Points", field: "points",width:60}
        ]
    }
    const onFirstDataRendered = useCallback((params) => {
        gridRef.columnApi.autoSizeColumns();
        }, []);

    const { loading, data, error } = usePlayers();
        if (loading) {
          return <p>Loading...</p>;
        }

    

    console.log(data);
    
return (
    
        <div className="ag-theme-balham p-16" style={{width: '100%',height: 600}}>
        <AgGridReact
            ref={gridRef}
            rowData={data}
            pagination={true}
            paginationPageSize={100}
            columnDefs={table.columns}>
                
        </AgGridReact>
    </div>
    
);
}