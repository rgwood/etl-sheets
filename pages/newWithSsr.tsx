import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { withRouter, SingletonRouter } from 'next/router';

export interface TransformState { initialData: RowData[], transformers: TableTransformer[], transformedWork: { transformer: TableTransformer, output: RowData[] }[] };

class NewWithSsr extends Component<{ router: SingletonRouter }, TransformState> {

    constructor(props: any) {
        super(props);
        let initialData = getInitialData(2);
        let transformers = getTransformers(2);
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

    onInitialDataChanged() {
        this.rerunTransformations();
    }

    rerunTransformations() {
        let initialData = this.state.initialData;
        let transformers = this.state.transformers;
        let transformedWork = transformMultipleAndShowWork(initialData, transformers);
        this.setState({ initialData: initialData, transformers: transformers, transformedWork: transformedWork });
    }

    render() {
        return <Layout title={`New Transform`}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div>
                    <div className="mt-2">Name: 2PM Bloomberg Import</div>
                    <div className="header">Transformation</div>
                </div>
                <div className="flex justify-end">
                    <div className="pt-3">
                        <button className="mx-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
                            <i className="fas fa-save pr-1"> </i>
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <GridComponent title="Example Data" editable={true} rowData={this.state.initialData} 
            onCellValueChanged={this.onInitialDataChanged.bind(this)}/>

            {this.state.transformedWork.map((tw, index) =>
                <GridComponent key={index} title={`Transformation ${index + 1}`} rowData={tw.output} transformer={tw.transformer}
                    onTransformerChanged={this.onTransformerChanged(index)}
                />)}
        </Layout>
    }

}

export default withRouter(NewWithSsr)