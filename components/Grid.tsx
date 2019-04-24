import '../styles/index.css'
import { AgGridReact } from 'ag-grid-react';
 import { Component, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { GridOptions, GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';

declare interface RowData {
    ticker: string;
    bid: number;
    [x: string]: any;
}

class Grid extends Component {
    constructor(props: any) {
        super(props);
        this.state = {    rowData: [{
            ticker: "AAPL", bid: 3400, ask: 3500
        }, {
            ticker: "GOOG", bid: 310, ask: 320
        }, {
            ticker: "MSFT", bid: 700, ask: 720
        }]};
    }

    api!: GridApi;
    columnApi!: ColumnApi;

    onGridReady(params: GridReadyEvent) {
        console.log('on grid ready');
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    colDefs = [{
        headerName: "Ticker", field: "ticker"
    }, {
        headerName: "Bid Price", field: "bid"
    }, {
        headerName: "Ask Price", field: "ask"
    }, {
        headerName: "Mid Price", field: "mid"
    }];

    rowData: RowData[] = [{
        ticker: "AAPL", bid: 3400, ask: 3500
    }, {
        ticker: "GOOG", bid: 310, ask: 320
    }, {
        ticker: "MSFT", bid: 700, ask: 720
    }];

    convertFormulaToJsFunction(formula: string) { 
        return `return ${formula.replace(/\$/g, 'row.')}` 
    }

    formulae = [{ field: "mid", formula: "($bid + $ask) / 2" }];

    formulaeWithDynamicFunction() {
        return this.formulae.map(f => {
            return { field: f.field, formula: f.formula, dynamicFunction: Function('row', this.convertFormulaToJsFunction(f.formula)) };
        });
    }

    evaluate() {
        console.log(this.state);
        this.state.rowData.forEach(row => {
            this.formulaeWithDynamicFunction().forEach(f => {
                row[f.field] = f.dynamicFunction(row);
            });
        });
        this.api.refreshCells();
    }

    gridOptions: GridOptions = { gridAutoHeight: true };

    render() {
        return <div>
        <button className="bg-blue-dark text-sm text-white rounded py-2 px-4 my-2" onClick={this.evaluate.bind(this)}>Evaluate</button>
        <div className="ag-theme-balham" >
            <AgGridReact columnDefs={this.colDefs} rowData={this.state.rowData} gridOptions={this.gridOptions} 
            onGridReady={this.onGridReady.bind(this)}/>
        </div>
    </div>
    }
}

// function Grid() {
//     const [colDefs, setColDefs] = useState([{
//         headerName: "Ticker", field: "ticker"
//     }, {
//         headerName: "Bid Price", field: "bid"
//     }, {
//         headerName: "Ask Price", field: "ask"
//     }, {
//         headerName: "Mid Price", field: "mid"
//     }]);

//     var initialRowData: RowData[] = [{
//         ticker: "AAPL", bid: 3400, ask: 3500
//     }, {
//         ticker: "GOOG", bid: 310, ask: 320
//     }, {
//         ticker: "MSFT", bid: 700, ask: 720
//     }];

//     var formulae = [{ field: "mid", formula: "($bid + $ask) / 2" }];

//     const convertFormulaToJsFunction = (formula: string) => `return ${formula.replace(/\$/g, 'row.')}`;

//     var formulaeWithDynamicFunction = formulae.map(f => {
//         return { field: f.field, formula: f.formula, dynamicFunction: Function('row', convertFormulaToJsFunction(f.formula)) };
//     });

//     // initialRowData.forEach(row => {
//     //     formulaeWithDynamicFunction.forEach(f => {
//     //         row[f.field] = f.dynamicFunction(row);
//     //     });
//     // });

//     const [rowData, setRowData] = useState(initialRowData);

//     const evaluate = () => {
//         console.log('click');
//         rowData.forEach(row => {
//             formulaeWithDynamicFunction.forEach(f => {
//                 row[f.field] = f.dynamicFunction(row);
//             });
//         });
//         setRowData(rowData);
//     };

//     const gridOptions: GridOptions = { gridAutoHeight: true };

//     return <div>
//         <button onClick={evaluate}>Evaluate</button>
//         <div className="ag-theme-balham" >
//             <AgGridReact columnDefs={colDefs} rowData={rowData} gridOptions={gridOptions} />
//         </div>
//     </div>
// }

export default Grid