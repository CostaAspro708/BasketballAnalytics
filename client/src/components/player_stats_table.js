import {usePlayers} from "./API/player.js";

import {AgGridReact} from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MedalCellRenderer from "./MedalCellRenderer";
//import MedalCellRenderer from './nameCellRender';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


export function YearApiTableReg(props){
    const gridRef = useRef();

    const table = {
        columns: [
            { field: 'Name', cellRenderer: MedalCellRenderer },
            { headerName: "FP", field: "fantasy_points",width:75, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "Pos", field: "position",width:50, sortable: true, filter: "agNumberColumnFilter"},
            //{ headerName: "Age", field: "age", width:50},
            { headerName: "Tm", field: "team",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "G", field: "games",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "GS", field: "started",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "MP", field: "mp",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGA", field: "fga",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGM", field: "fg",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            //{ headerName: "FG%", field: "fgp",width:55},
            { headerName: "3PA", field: "three_attempts",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "3PM", field: "three_made",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            //{ headerName: "3P%", field: "three_percent",width:55},
            { headerName: "FTA", field: "fta" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FTM", field: "ft",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            //{ headerName: "FT%", field: "ftp" ,width:50},
            //{ headerName: "ORB", field: "orb" ,width:60},
            //{ headerName: "DRB", field: "drb" ,width:60},
            { headerName: "PTS", field: "points",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "TRB", field: "trb" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "AST", field: "ass" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "STL", field: "stl" ,width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "BLK", field: "blk",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "TOV", field: "tov" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "PF", field: "pf",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
        ]
    }
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
          document.getElementById('filter-text-box').value
        );
      }, []);
    const { loading, data, error } = usePlayers();
        if (loading) {
          return <p>Loading...</p>;
        }

    


    data.forEach(calculateFP);
    function calculateFP(value, index, array) {
        data[index].fantasy_points = (data[index].fga*-0.5) +(data[index].fg*0.5)+(data[index].fta*-0.25)+(data[index].ft*0.25)+(data[index].three_attempts*-0.5)+(data[index].three_made*0.5)+(data[index].points*1)+(data[index].trb*1.2)+(data[index].ass*1.5)+(data[index].stl*3)+(data[index].blk*3)+(data[index].tov*-1)+(data[index].pf*-0.5);
        if((data[index].points > 9 && data[index].trb > 9) || (data[index].points > 9 && data[index].ass > 9)){
            data[index].fantasy_points = data[index].fantasy_points + 4;
        }else if(data[index].points > 9 && data[index].trb > 9 && data[index].ass > 9){
            data[index].fantasy_points = data[index].fantasy_points + 8;
        }
        data[index].fantasy_points = Math.round((data[index].fantasy_points + Number.EPSILON) * 100) / 100
      }
    console.log(data);
    
return (
        <div>
            <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
            />
            <div className="ag-theme-balham " style={{width: 1400,height: 600}}>
                <AgGridReact
                //animateRows={true}
                //suppressAggFuncInHeader={true}
                rowSelection={'single'}
                ref={gridRef}
                rowData={data}
                columnDefs={table.columns}>
                
                </AgGridReact>
            </div>
        </div>
        
    
);
}
