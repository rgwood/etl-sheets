import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import Link from 'next/link';
import { NextContext } from 'next';
import { withRouter, SingletonRouter } from 'next/router';

export interface TransformState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

class TransformWithSsr extends Component<{ router: SingletonRouter }, TransformState> {

    constructor(props: any) {
        super(props);
        let initialData = getInitialData(1);
        let transformers = getTransformers(1);
        let transformedWork = transformMultipleAndShowWork(initialData, transformers);
        this.state = { initialData: initialData, transformers: transformers, transformedWork: transformedWork };
    }

    static async getInitialProps({ query }: NextContext) {
        console.log({ query });
    }

    // addTransformerAtEnd() {
    //     // let transformers = this.state.transformers;
    //     console.log(this.state.transformers);
    //     this.setState({ transformers: this.state.transformers.concat([new TableTransformer(' ')]), }, () => {
    //         console.log(this.state.transformers);
    //         this.rerunTransformations();
    //     });
    // }

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
        let query = this.props.router.query!;
        return <Layout title={`Transform Failure: ${query.id}`} error={true}>

            <div className="mt-2">2PM Bloomberg Import</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>

            </div>
            </div>
            <div className="header">History</div>

            <div>Started at <span className="font-bold">2019-04-30 04:29:18</span> following successful import <Link href='/fake'><a>14324234</a></Link></div>
            <div className="mt-2">Failed at <span className="font-bold">2019-04-30 04:29:55</span> (27s elapsed) in <Link href='/fake'><a>Transformation 2</a></Link> </div>

            <div className="header">Error Details</div>
            blah blah blah... exception details,

            <div className="header">Transformation</div>

            <GridComponent title="Initial Data" rowData={this.state.initialData} />

            {this.state.transformedWork.map((tw, index) =>
                <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.output} transformer={tw.transformer}
                    onTransformerChanged={this.onTransformerChanged(index)}
                />)}
        </Layout>
    }

}

export default withRouter(TransformWithSsr)