import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import Grid from '../components/Grid';
import Clock from '../components/Clock';
import { Formula } from '../models/formula';
import { getInitialData, getTransformationFormulae } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'

export default class Index extends Component {



  render() {
    let initialData = getInitialData(1);
    let formulae = getTransformationFormulae(1);
    let transformedWork = transformMultipleAndShowWork(initialData, formulae);

    return <Layout title="ETLSheets">
      <p>Test test test...</p>

      <div className="mt-4">
        <Clock />
      </div>

      <Grid title="Initial Data" rowData={initialData} />

      {transformedWork.map((tw, index) => <Grid key={index} title={`Transformation ${index + 1}`} rowData={tw.transformedData} formula={tw.formula} onFormulaExpressionChanged={(exp: string) => console.log(`${index} ${exp}`)} />)}

      {/* {formulae.map((f, index) => <Grid title={`Transformation ${index+1}`} rowData={initialData} formula={f}/>)} */}
    </Layout>
  }

}