import '../styles/index.css'
import { AgGridReact } from 'ag-grid-react';
import { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Grid, ColDef, GridOptions, GridReadyEvent, GridApi, ColumnApi, CellClassParams } from 'ag-grid-community';
import { ColumnTransformer } from '../models/columnTransformer';
import { RowData } from '../models/rowData';
import uniq from 'lodash/uniq';
import CustomHeader from './CustomHeader';
import { TableTransformer } from '../models/tableTransformer';

export interface GridProps {
    title: string;
    rowData: RowData[];
    transformer?: TableTransformer;
    onTransformerChanged?: (newValue:TableTransformer) => void
}

class GridComponent extends Component<GridProps> {
    colDefs: ColDef[] = [];

    constructor(props: GridProps) {
        super(props);
        this.colDefs = this.getColDefs(props);
    }

    onRowExpressionChanged() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let newExpression = event.target.value;
            let transformer = this.props.transformer!;
            transformer.expression = newExpression;
            this.props.onTransformerChanged!(transformer);
        }
    }

    onColumnExpressionChanged(columnName: string) {
        return (newExpression: string) => {
            let transformer = this.props.transformer!;
            let formula = transformer.columnFormulae.find(cf => cf.columnName.toLowerCase() === columnName.toLowerCase())!;
            formula.expression = newExpression;
            this.props.onTransformerChanged!(transformer);
        }
    }

    // find the name of all columns to be displayed, either b/c it's in the data or the formula
    getColDefs(props: GridProps): ColDef[] {
        //slow+ugly. Should we just assume that each property is in every column?
        var colNames: string[] = [];
        props.rowData.forEach(rd => {
            colNames = colNames.concat(Object.keys(rd));
        });
        colNames = uniq(colNames);

        let columnFormulaFromName = (colName: string) => {
            if (props.transformer) {
                return props.transformer.columnFormulae.find(cf => cf.columnName.toLowerCase() === colName.toLowerCase());
            }
            return undefined;
        }

        let columnNameToColDef = (name: string) => {
            let columnFormula = columnFormulaFromName(name);
            if (columnFormula) {
                return {
                    field: name, cellClass: (params: CellClassParams) => isNaN(params.value) ? 'text-red' : 'text-green-dark',
                    headerComponentFramework: CustomHeader,
                    headerComponentParams: { formulaExpression: columnFormula.expression, onFormulaExpressionChanged: this.onColumnExpressionChanged(name) }
                }
            }

            return { field: name, headerComponentFramework: CustomHeader, }
        };

        return colNames.map(cn => columnNameToColDef(cn));
    }

    gridApi!: GridApi;
    columnApi!: ColumnApi;

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }

    gridOptions: GridOptions = { domLayout: 'autoHeight', headerHeight: this.props.transformer ? 64 : 32 };

    render() {
        return <div>
            <div className="my-2 mr-2 text-lg text-blue">{this.props.title}
            {/* TODO: make this input box more attractive */}
            {this.props.transformer && this.props.transformer.expression
            && <input className="shadow ml-2 text-sm appearance-none border rounded-sm  p-1 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={this.onRowExpressionChanged().bind(this)} value={this.props.transformer.expression} />}
                 
            </div>
            <div className="ag-theme-balham" >
                <AgGridReact columnDefs={this.colDefs} rowData={this.props.rowData} gridOptions={this.gridOptions}
                    onGridReady={this.onGridReady.bind(this)} />
            </div>
        </div>
    }
}

export default GridComponent