import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import Clock from '../components/Clock';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import Link from 'next/link';

export interface TransformState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

export default class Transform extends Component<{}, TransformState> {

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

    render() {
        return <Layout title="2PM Bloomberg Import">
        <div className="mt-2">ID: 18234867</div>

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

        </Layout>
    }

}