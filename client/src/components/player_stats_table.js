import {usePlayers, usePlayerStats} from "../API/player.js";
import moment from 'moment';
import {AgGridReact} from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MedalCellRenderer from "./MedalCellRenderer";
//import MedalCellRenderer from './nameCellRender';


import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DateCellRenderer from "./DateCellRenderer.js";

const getRowData = () => {
    return [
      { date: new Date(2019, 0, 1), avgTemp: 8.27 },
      { date: new Date(2019, 0, 5), avgTemp: 7.22 },
      { date: new Date(2019, 0, 8), avgTemp: 11.54 },
      { date: new Date(2019, 0, 11), avgTemp: 8.44 },
      { date: new Date(2019, 0, 22), avgTemp: 12.03 },
      { date: new Date(2019, 0, 23), avgTemp: 9.68 },
      { date: new Date(2019, 0, 24), avgTemp: 9.9 },
      { date: new Date("2021-10-21"), avgTemp: 8.74 },
    ];
  };

  const getColumnDefs = () => {
    return [
      { field: 'date', valueFormatter: dateFormatter },
      { field: 'avgTemp' },
    ];
  };
  const dateFormatter = (params) => {
    return params.value
      ? params.value.toISOString().substring(0, 10)
      : params.value;
  };
  
export function YearApiTableReg(props){
    const gridRef = useRef();
    
    const table = {
        columns: [
            {headerName: "",valueGetter: "node.rowIndex + 1", width:45},
            { field: 'Name', cellRenderer: MedalCellRenderer, sortable: true},
            {  headerName: "FP", field: "name", hide: true},
            { headerName: "FP", field: "fantasy_points",width:75, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "Pos", field: "position",width:50, sortable: true, filter: "agNumberColumnFilter"},
            { headerName: "Age", field: "age", width:50},
            { headerName: "Tm", field: "team",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "G", field: "games",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "GS", field: "started",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "MP", field: "mp",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGA", field: "fga",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGM", field: "fg",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            // { headerName: "FG%", field: "fgp",width:55},
            { headerName: "3PA", field: "three_attempts",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "3PM", field: "three_made",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            // { headerName: "3P%", field: "three_percent",width:55},
            { headerName: "FTA", field: "fta" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FTM", field: "ft",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            // { headerName: "FT%", field: "ftp" ,width:50},
            // { headerName: "ORB", field: "orb" ,width:60},
            // { headerName: "DRB", field: "drb" ,width:60},
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

export function PlayerTable(props){
    const gridRef = useRef();
    var currentChartRef;
    const table = {
        columns: [
            { field: 'date', valueFormatter:dateFormatter, sortable: true},
            { headerName: "T", field: "team", width: 70},
            { headerName: " ", field: "homeaway", width: 40},
            { headerName: "O", field: "opponent",width: 70},
            { headerName: "Score", field: "win_loss", width: 100},
            { headerName: "FP", field: "fantasy_points",width:75, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "MP", field: "mp",width:60, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGA", field: "fga",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FGM", field: "fg",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "3PA", field: "three_attempts",width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "3PM", field: "three_made",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FTA", field: "fta" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "FTM", field: "ft",width:70, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "PTS", field: "points",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "TRB", field: "trb" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "AST", field: "ass" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "STL", field: "stl" ,width:65, sortable: true,comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "BLK", field: "blk",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "TOV", field: "tov" ,width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
            { headerName: "PF", field: "pf",width:65, sortable: true, comparator: (valueA, valueB, nodeA, nodeB, isInverted) => valueA - valueB},
        ]
    }
    function dateFormatter(params) {
        return moment(params.value).format('MM/DD/YYYY');

      }

    const popupParent = useMemo(() => {
        return document.body;
      }, []);

    const chartThemeOverrides = useMemo(() => {
        return {
          line: {
            title: {
              enabled: true,
              text: 'Fantasy Points for 2021-2022',
            },
            legend: {
              enabled: false,
            },
            padding: {
              top: 15,
              bottom: 25,
            },
            navigator: {
              enabled: true,
              height: 20,
              margin: 25,
            },
            axes: {
              time: {
                label: {
                  rotation: 0,
                  format: '%b %Y',
                },
              },
              category: {
                label: {
                  rotation: 0,
                  formatter: (params) => {
                    return params.value.toString()[0]+params.value.toString()[1]+params.value.toString()[2]+params.value.toString()[3]+params.value.toString()[4]+params.value.toString()[5]+params.value.toString()[6]+params.value.toString()[7]+params.value.toString()[8]+params.value.toString()[9];
                  },
                  
                },
              },
              number: {
                label: {
                  formatter: (params) => {
                    return params.value;
                  },
                },
              },
            },
          },
        };
      }, []);
      const onSortChanged = useCallback(
          (params) => {
            gridRef.api.refreshCells();
          }
      );
      const onFirstDataRendered = useCallback(
        (params) => {
          if (currentChartRef) {
            currentChartRef.destroyChart();
          }
          var createRangeChartParams = {
            chartContainer: document.querySelector('#myChart'),
            suppressChartRanges: true,
            cellRange: {
              columns: ['date', 'fantasy_points'],
            },
            chartType: 'line',
          };
          currentChartRef = gridRef.current.api.createRangeChart(
            createRangeChartParams
          );
        },
        [currentChartRef]
      );
    
      const toggleAxis = useCallback(() => {
        var axisBtn = document.querySelector('#axisBtn');
        axisBtn.textContent = axisBtn.value;
        axisBtn.value = axisBtn.value === 'time' ? 'category' : 'time';
        const columnDefs = getColumnDefs();
        columnDefs.forEach(function (colDef) {
          if (colDef.field === 'date') {
            colDef.chartDataType = axisBtn.value;
          }
        });
        gridRef.current.api.setColumnDefs(columnDefs);
      }, []);
    
      const getChartToolbarItems = useCallback(() => {
        return ['chartData', 'chartFormat'];
      }, []);

    const { loading, data, error } = usePlayerStats("/players/"+props.let+"/"+props.id);
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
    
return (
        <div>
            <div id="myChart" class="ag-theme-alpine my-chart p-4" style={{width: 1400,height: 600}}> </div>
            <div className="ag-theme-balham " style={{width: 1400,height: 600}}>
                <AgGridReact
                rowSelection={'single'}
                ref={gridRef}
                rowData={data}
                columnDefs={table.columns}
                popupParent={popupParent}
                enableRangeSelection={true}
                enableCharts={true}
                chartThemeOverrides={chartThemeOverrides}
                getChartToolbarItems={getChartToolbarItems}
                onFirstDataRendered={onFirstDataRendered}
                onSortChanged={onSortChanged}
                >
                
                </AgGridReact>
            </div>
        </div>
        
    
);

}
