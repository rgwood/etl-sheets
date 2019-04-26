import '../styles/index.css'
import { AgGridReact } from 'ag-grid-react';
import { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Grid, ColDef, GridOptions, GridReadyEvent, GridApi, ColumnApi, CellClassParams } from 'ag-grid-community';
import {ColumnFormula} from '../models/columnFormula';
import {RowData} from '../models/rowdata';
import uniq from 'lodash/uniq';
import CustomHeader from './CustomHeader';

export interface GridProps {
    title: string;
    rowData: RowData[];
    formula?: ColumnFormula;
    onFormulaExpressionChanged?: Function
}

class GridComponent extends Component<GridProps> {
    colDefs: ColDef[] = [];

    constructor(props: GridProps) {
        super(props);
        this.colDefs = this.getColDefs(props);
    }

    // find the name of all columns to be displayed, either b/c it's in the data or the formula
    getColDefs(props: GridProps): ColDef[] {
        //slow+ugly. TODO: find a more declarative way of doing this
        var colNames: string[] = [];

        props.rowData.forEach(rd => {
            colNames = colNames.concat(Object.keys(rd));
        });

        if (props.formula) {
            colNames = colNames.concat(props.formula.columnName);
        }

        let columnNameToColDef = (name: string) => {
            
            if(props.formula && props.onFormulaExpressionChanged && name.toLowerCase() === props.formula.columnName.toLowerCase()) {
                return {field: name, cellClass: (params: CellClassParams) =>  isNaN(params.value) ? 'text-red' : 'text-green-dark', 
                headerComponentFramework: CustomHeader, 
                headerComponentParams: {formulaExpression: props.formula.expression, onFormulaExpressionChanged: this.props.onFormulaExpressionChanged}}
            }
            return {field: name, headerComponentFramework: CustomHeader,}};
    
        return uniq(colNames).map(cn => columnNameToColDef(cn));
    }

    gridApi!: GridApi;
    columnApi!: ColumnApi;

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }

    gridOptions: GridOptions = { domLayout: 'autoHeight', headerHeight: this.props.formula ? 64 : 32 };

    render() {
        return <div>
            <div className="my-2 mr-2 text-lg text-blue">{this.props.title}</div>
            <div className="ag-theme-balham" >
                <AgGridReact columnDefs={this.colDefs} rowData={this.props.rowData} gridOptions={this.gridOptions}
                    onGridReady={this.onGridReady.bind(this)} />
            </div>
        </div>
    }
}

export default GridComponent