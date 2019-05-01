import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import Link from 'next/link';
import AceEditor from 'react-ace';
import { NextContext } from 'next';
import { withRouter } from 'next/router';

export interface TransformState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

class TransformWithSsr extends Component<{router: SingletonRouter}, TransformState> {

    constructor(props: any) {
        super(props);
        let initialData = getInitialData(1);
        let transformers = getTransformers(1);
        let transformedWork = transformMultipleAndShowWork(initialData, transformers);
        this.state = { initialData: initialData, transformers: transformers, transformedWork: transformedWork };
    }

    static async getInitialProps({query}: NextContext) {
        console.log({query});
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

    render() {
        let query = this.props.router.query;
        return <Layout title="2PM Bloomberg Import">
        <div className="mt-2">ID: {query.id}</div>

            <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">History</div>

            <div>Started at <span className="font-bold">2019-04-30 04:29:18</span> following successful import <Link href='/fake'><a>14324234</a></Link></div>
            <div className="mt-2 mb-4">Failed at <span className="font-bold">2019-04-30 04:29:55</span> (27s elapsed) in <Link href='/fake'><a>Transformation 2</a></Link> </div>

            <div className="mt-4 mb-2 text-lg text-alloy-teal-light font-serif">Error Details</div>
            blah blah blah... exception details, 

            <GridComponent title="Initial Data" rowData={this.state.initialData} />

            {this.state.transformedWork.map((tw, index) =>
                <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.output} transformer={tw.transformer}
                    onTransformerChanged={this.onTransformerChanged(index)}
                />)}

<AceEditor
  mode="javascript"
  theme="solarized_light"
  name="blah2"
//   onLoad={this.onLoad}
//   onChange={this.onChange}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
  setOptions={{
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: true,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
  }}/>
            

        </Layout>
    }

}

export default withRouter(TransformWithSsr)