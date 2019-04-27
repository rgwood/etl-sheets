import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import Clock from '../components/Clock';
import { ColumnTransformer } from '../models/columnTransformer';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import {RowData} from '../models/rowData';
import {RowTransformer} from '../models/rowTransformer';
import { TableTransformer } from '../models/tableTransformer';

export interface IndexState {initialData: RowData[], transformers: TableTransformer[], transformedWork: {transformer: TableTransformer, output: RowData[]}[]};

export default class Index extends Component<{}, IndexState> {

  constructor(props: any) {
    super(props);
    let initialData = getInitialData(1);
    let transformers = getTransformers(1);
    let transformedWork = transformMultipleAndShowWork(initialData, transformers);
    this.state = {initialData: initialData, transformers: transformers, transformedWork: transformedWork };
}

   onTransformerChanged(index: number) {
     return (newValue:TableTransformer) => {
       console.log(`${index} ${newValue}`);

       let transformers = this.state.transformers;
       transformers[index] = newValue;
       this.setState({transformers: transformers});
       this.rerunTransformations();
      };
   }

//TODO: fix these up with the new transformer metaphor
  //  onFormulaExpressionChanged(index: number) {
  //    return (newValue:string) => {
  //      console.log(`${index} ${newValue}`);

  //      let formulae = this.state.formulae;
  //      formulae[index].expression = newValue;
  //      this.setState({formulae: formulae});
  //      this.rerunTransformations();
  //     };
  //  }

   rerunTransformations() {
    let initialData = this.state.initialData;
    let transformers = this.state.transformers;
    let transformedWork = transformMultipleAndShowWork(initialData, transformers);
    this.setState({initialData: initialData, transformers: transformers, transformedWork: transformedWork });
   }

  render() {
    return <Layout title="ETLSheets">
      <p>Test test test...</p>

      <div className="mt-4">
        <Clock />
      </div>

      <GridComponent title="Initial Data" rowData={this.state.initialData} />

      {this.state.transformedWork.map((tw, index) => 
      <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.output} transformer={tw.transformer} 
      onTransformerChanged = {this.onTransformerChanged(index)}
      />)}
{/* 
      {this.state.transformedWork.map((tw, index) => <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.transformedData} formula={tw.formula} 
      onFormulaExpressionChanged={this.onFormulaExpressionChanged(index)} />)} */}

    </Layout>
  }

}