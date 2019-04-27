import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import Clock from '../components/Clock';
import { ColumnTransformer } from '../models/columnTransformer';
import { getInitialData, getTransformationFormulae } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import {RowData} from '../models/rowData';
import {RowTransformer} from '../models/rowTransformer';

export interface IndexState {initialData: RowData[], formulae: ColumnTransformer[], transformedWork: {formula: ColumnTransformer, transformedData: RowData[]}[]};

export default class Index extends Component<{}, IndexState> {

  constructor(props: any) {
    super(props);
    let initialData = getInitialData(1);
    let formulae = getTransformationFormulae(1);
    let transformedWork = transformMultipleAndShowWork(initialData, formulae);
    this.state = {initialData: initialData, formulae: formulae, transformedWork: transformedWork };
}

   onFormulaExpressionChanged(index: number) {
     return (newValue:string) => {
       console.log(`${index} ${newValue}`);

       let formulae = this.state.formulae;
       formulae[index].expression = newValue;
       this.setState({formulae: formulae});
       this.rerunTransformations();
      };
   }

   rerunTransformations() {
    let initialData = this.state.initialData;
    let formulae = this.state.formulae;
    console.log({formulae});
    let transformedWork = transformMultipleAndShowWork(initialData, formulae);
    console.log(transformedWork);
    this.setState({initialData: initialData, formulae: formulae, transformedWork: transformedWork });
   }

  render() {

    let rd: RowData = {foo: 'foo'};
    console.log({rd});
    let expression  = `$foo = 'bar';
                       $bar = 'foo';`;
    let rowFormula =  new RowTransformer(expression);
    let transformed = rowFormula.expressionToFunction()(rd);
    console.log({transformed});

    return <Layout title="ETLSheets">
      <p>Test test test...</p>

      <div className="mt-4">
        <Clock />
      </div>

      <GridComponent title="Initial Data" rowData={this.state.initialData} />

      {this.state.transformedWork.map((tw, index) => <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.transformedData} formula={tw.formula} 
      onFormulaExpressionChanged={this.onFormulaExpressionChanged(index)} />)}

    </Layout>
  }

}