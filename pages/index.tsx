import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import Clock from '../components/Clock';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { AgGridReact } from 'ag-grid-react';
import { ColumnApi, GridApi, GridReadyEvent, ColDef, GridOptions } from 'ag-grid-community';
import Router from 'next/router'

export interface IndexState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

export default class Index extends Component<{}, IndexState> {

  constructor(props: any) {
    super(props);
    let initialData = getInitialData(1);
    let transformers = getTransformers(1);
    let transformedWork = transformMultipleAndShowWork(initialData, transformers);
    this.state = { initialData: initialData, transformers: transformers, transformedWork: transformedWork };
  }

  onTransformerChanged(index: number) {
    return (newValue: TableTransformer) => {
      let transformers = this.state.transformers;
      transformers[index] = newValue;
      this.setState({ transformers: transformers });
      this.rerunTransformations();
    };
  }

  rerunTransformations() {
    let initialData = this.state.initialData;
    let transformers = this.state.transformers;
    let transformedWork = transformMultipleAndShowWork(initialData, transformers);
    this.setState({ initialData: initialData, transformers: transformers, transformedWork: transformedWork });
  }

  private recentIssueData = [{time:'2019-05-24 14:12:48', description:'2PM Bloomberg Extract', type:'Transform'},
  {time:'2019-05-24 13:27:29', description:'Afternoon FTSE Sector Extract', type:'Transform'},
  {time:'2019-05-24 13:11:36', description:'Afternoon FTSE Index Extract', type:'Transform'}
];

  gridApi!: GridApi;
  columnApi!: ColumnApi;
  colDefs: ColDef[] = [{field:'time', headerName:'Time (UTC)', maxWidth: 150}, {field:'description'}, {field: 'type'}];

  doubleClickRow() {
    console.log('clicked');
    Router.push(`/transform`);
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
        Welcome. There are currently <span className="text-red">12</span> unresolved issues (<a className='text-blue' href='/fakeLink'>1 new</a>).
      </div>

      <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">Search</div>

      <input className="shadow text-sm text-grey-darker appearance-none border rounded-sm w-1/2 p-1 leading-tight focus:outline-none focus:shadow-outline"  
            type="text" placeholder="Search all issues..." />

      <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">Recent Issues</div>

      <div className="ag-theme-balham" >
        <AgGridReact columnDefs={this.colDefs} rowData={this.recentIssueData} gridOptions={this.gridOptions}
          onGridReady={this.onGridReady.bind(this)} ></AgGridReact>
      </div>
      {/* <GridComponent title="Initial Data" rowData={this.state.initialData} />

      {this.state.transformedWork.map((tw, index) =>
        <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.output} transformer={tw.transformer}
          onTransformerChanged={this.onTransformerChanged(index)}
        />)} */}

    </Layout>
  }

}