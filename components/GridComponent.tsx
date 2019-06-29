import '../styles/index.css'
import { AgGridReact } from 'ag-grid-react';
import { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Grid, ColDef, GridOptions, GridReadyEvent, GridApi, ColumnApi, CellClassParams, ColumnFactory, ModelUpdatedEvent, CellValueChangedEvent, ITooltipParams } from 'ag-grid-community';
import { ColumnTransformer } from '../models/columnTransformer';
import { RowData } from '../models/rowData';
import uniq from 'lodash/uniq';
import GridColumnHeader from './GridColumnHeader';
import { TableTransformer } from '../models/tableTransformer';
import classNames from 'classnames'
import AceEditor, { EditorProps, AceEditorProps } from 'react-ace';
import brace, { Editor } from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import { isUndefined } from 'util';

export interface GridProps {
    title: string;
    rowData: RowData[];
    transformer?: TableTransformer;
    onTransformerChanged?: (newValue: TableTransformer) => void;
    editable?: boolean;
    onCellValueChanged?: () => void;
    inFailureMode?: boolean;
}

class GridComponent extends Component<GridProps> {
    colDefs: ColDef[] = [];
    hasExpression: boolean = false;
    // Extremely dumb hack around the difficulties of identifying dirty rows in ag-grid
    dirtyValue: string = 'MSFT Equity';

    constructor(props: GridProps) {
        super(props);
        this.colDefs = this.getColDefs(props);
        this.hasExpression = !!this.props.transformer && !!this.props.transformer.expression;
    }

    // Update the column defs whenever props change. This is potentially really slow, can disable if we need speed for bigger transforms
    componentWillReceiveProps(newProps: any) {
        let newColDefs = this.getColDefs(newProps)
        let newColDefFieldNames = newColDefs.map(cd => cd.field!);
        let currColDefFieldNames = this.colDefs.map(cd => cd.field!);
        function arraysEqual(a1: string[], a2: string[]) {
            return JSON.stringify(a1) == JSON.stringify(a2);
        }

        if (!arraysEqual(currColDefFieldNames, newColDefFieldNames)) {
            this.colDefs = newColDefs;
            this.gridApi.sizeColumnsToFit();
        }
    }

    onRowExpressionChanged() {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            let newExpression = event.target.value;
            let transformer = this.props.transformer!;
            transformer.expression = newExpression;
            this.props.onTransformerChanged!(transformer);
        }
    }

    // I think the type definitions for react-ace are screwy, it thinks this is an EditorProps instead of an Editor
    onAceEditorLoad(editor: any) {
        let typedEditor: Editor = editor;
        // Stop ace from warning when no semicolon provided. Source: https://github.com/ajaxorg/ace/issues/1754
        typedEditor.session.$worker.send("changeOptions", [{ asi: true, "-W051": false }]);
    }

    onAceEditorChanged(newExpressionValue: string) {
        let transformer = this.props.transformer!;
        transformer.expression = newExpressionValue;
        this.props.onTransformerChanged!(transformer);
    }

    onModelUpdated(event: ModelUpdatedEvent) {
        this.gridApi && this.gridApi.sizeColumnsToFit();
    }

    onCellValueChanged(event: CellValueChangedEvent) {
        console.log(event.value);
        this.dirtyValue = event.value;
        console.log(this.dirtyValue);
        this.gridApi.refreshCells();
        this.props.onCellValueChanged && this.props.onCellValueChanged();
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

        let columnTransformerFromName = (colName: string) => {
            if (props.transformer) {
                return props.transformer.columnFormulae.find(cf => cf.columnName.toLowerCase() === colName.toLowerCase());
            }
            return undefined;
        }

        let columnNameToColDef = (name: string) => {
            let columnTransformer = columnTransformerFromName(name);
            if (columnTransformer) {
                return {
                    field: name, 
                    cellClass: (params: CellClassParams) => isUndefined(params.value) ? 'bg-red-lighter' : 'text-green-dark',
                    headerComponentFramework: GridColumnHeader,
                    minWidth:180,
                    tooltip: (params: ITooltipParams) => isUndefined(params.value) ? "LookupException: ticker 'MSFY Equity' not found." : "",
                    headerComponentParams: { formulaExpression: columnTransformer.expression, onFormulaExpressionChanged: this.onColumnExpressionChanged(name) }
                }
            }

            return { field: name, editable: this.props.editable, headerComponentFramework: GridColumnHeader, 
                    cellClass: (params: CellClassParams) => 
                    (params.value == this.dirtyValue && props.inFailureMode) ? 'bg-green-lighter' : ''
            }
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

    gridOptions: GridOptions = { domLayout: 'autoHeight', headerHeight: this.props.transformer ? 64 : 32, 
    enableBrowserTooltips: true};

    render() {
        return <div>
            <div className={classNames("mt-2 mr-2", this.props.transformer && this.props.transformer.failed ? "subheader-error" : "subheader")}>
            {`${this.props.title}${this.props.transformer && this.props.transformer.description ? `: ${this.props.transformer.description}` : ''}`}
                {this.hasExpression &&
                    <div className="mt-2 p-1 border rounded-sm shadow" >
                        <AceEditor
                            mode="javascript"
                            theme="textmate"
                            onLoad={this.onAceEditorLoad.bind(this)}
                            onChange={this.onAceEditorChanged.bind(this)}
                            fontSize={12}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={false}
                            value={this.props.transformer ? this.props.transformer.expression : ''}
                            setOptions={{
                                showLineNumbers: false,
                                tabSize: 2,
                                maxLines: 100
                            }} /></div>}
            </div>
            <div className="ag-theme-balham" >
                <AgGridReact columnDefs={this.colDefs} rowData={this.props.rowData} gridOptions={this.gridOptions}
                    onGridReady={this.onGridReady.bind(this)} onModelUpdated={this.onModelUpdated.bind(this)} onCellValueChanged={this.onCellValueChanged.bind(this)} />
            </div>
        </div>
    }
}

export default GridComponent