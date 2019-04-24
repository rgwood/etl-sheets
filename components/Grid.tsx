import '../styles/index.css'
import { AgGridReact } from 'ag-grid-react';
import { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { ColDef, GridOptions, GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import {Formula} from '../models/formula';
import {RowData} from '../models/rowdata';
import {transform} from '../services/transformer.service';
import uniq from 'lodash/uniq';

export interface GridProps {
    title: string;
    rowData: RowData[];
    formula?: Formula;
}

class Grid extends Component<GridProps, {rowData: RowData[]}> {
    colDefs: ColDef[] = [];

    constructor(props: GridProps) {
        super(props);
        this.state = { rowData: props.rowData };

        this.colDefs = this.getColDefs(props);
    }

    // find the name of all columns to be displayed, either b/c it's in the data or the formula
    getColDefs(props: GridProps) {
        //slow+ugly. TODO: find a more declarative way of doing this
        var colNames: string[] = [];

        props.rowData.forEach(rd => {
            colNames = colNames.concat(Object.keys(rd));
        });

        if (props.formula) {
            colNames = colNames.concat(props.formula.field);
        }

        return uniq(colNames).map(cn => {return {field: cn}});
    }

    gridApi!: GridApi;
    columnApi!: ColumnApi;

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    }

    evaluate() {
        if (this.props.formula) {
            this.setState({rowData: transform(this.state.rowData, this.props.formula)});
        }
    }

    gridOptions: GridOptions = { domLayout: 'autoHeight' };

    render() {
        return <div>
            <div className="my-2 mr-2 text-lg text-blue">{this.props.title}
            {this.props.formula ? <button className="bg-blue-dark text-sm text-white rounded py-2 px-4 ml-2 my-2" onClick={this.evaluate.bind(this)}>Evaluate</button> : ''}
            </div>
            <div>{this.props.formula ? <span>{this.props.formula.field} = {this.props.formula.expression}</span>: ''}</div>
            <div className="ag-theme-balham" >
                <AgGridReact columnDefs={this.colDefs} rowData={this.state.rowData} gridOptions={this.gridOptions}
                    onGridReady={this.onGridReady.bind(this)} />
            </div>
        </div>
    }
}

export default Grid