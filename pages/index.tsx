import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { AgGridReact } from 'ag-grid-react';
import { ColumnApi, GridApi, GridReadyEvent, ColDef, GridOptions, RowDoubleClickedEvent, CellClassParams } from 'ag-grid-community';
import Router from 'next/router'

export interface IndexState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

export default class Index extends Component<{}, IndexState> {

  private recentIssueData = [{id: 4564980, time:'2019-05-24 14:12:48', description:'2PM Bloomberg Fixing Rates', stage:'Transform', status: 'Error'},
  {id: 4564979, time:'2019-05-24 13:27:29', description:'Afternoon FTSE Sector Constituents', stage:'Transform', status: 'Resolved'},
  {id: 4564978, time:'2019-05-24 13:11:36', description:'Afternoon FTSE Indexes', stage:'Transform', status: 'Resolved'},
  {id: 4564977, time:'2019-05-24 13:00:18', description:'Tokyo Stock Exchange TOPIX Capture', stage:'Extract', status: 'Error'},
  {id: 4564976, time:'2019-05-24 13:00:05', description:'Refinitiv EMEA Evaluated Fixed Income', stage:'Transform', status: 'Resolved'},
  {id: 4564975, time:'2019-05-24 13:00:18', description:'Goldman Sachs Futures Margining', stage:'Extract', status: 'Resolved'},
];

  gridApi!: GridApi;
  columnApi!: ColumnApi;
  colDefs: ColDef[] = [{field: 'id', headerName: 'ID', maxWidth: 85}, 
                       {field:'time', headerName:'Time (UTC)', maxWidth: 150}, 
                       {field:'description'}, 
                       {field: 'stage', maxWidth: 120},
                       {field:'status', maxWidth: 200, cellClass: (ccp: CellClassParams) => ccp.value === 'Error' ? "text-red font-bold" : "text-green"}];

  doubleClickRow(event: RowDoubleClickedEvent ) {
    let dataType: string = event.data.stage;
    Router.push(`/${dataType.toLowerCase()}?id=${event.data.id}`);
  }

  gridOptions: GridOptions = { domLayout: 'autoHeight', onRowDoubleClicked: this.doubleClickRow};

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
}

  render() {
    return <Layout title="ETL Dashboard">
      <div className="my-4">
        Welcome. There are currently <span className="text-red">12</span> unresolved issues (<a className='text-blue' href='/transform'>1 new</a>).
      </div>

      <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">Search</div>

      <input className="shadow text-sm text-grey-darker appearance-none border rounded-sm w-1/2 p-1 leading-tight focus:outline-none focus:shadow-outline"  
            type="text" placeholder="Search all issues..." />

      <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">Recent Issues</div>

      <div className="ag-theme-balham" >
        <AgGridReact columnDefs={this.colDefs} rowData={this.recentIssueData} gridOptions={this.gridOptions}
          onGridReady={this.onGridReady.bind(this)} ></AgGridReact>
      </div>

    </Layout>
  }

}