import '../styles/index.css'
import Layout from '../components/Layout'
import { Component } from 'react';
import GridComponent from '../components/GridComponent';
import { getInitialData, getTransformers } from '../services/data.service';
import { transformMultipleAndShowWork } from '../services/transformer.service'
import { RowData } from '../models/rowData';
import { TableTransformer } from '../models/tableTransformer';
import { withRouter, SingletonRouter } from 'next/router';

// This is weird how we store the transformers twice (in transformers and transformedWork.transformer)
// TODO: eliminate this duplication
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

    addTransformation() {
        
        let newTransformer = new TableTransformer(' ', [],'New');
        let finalData = this.state.transformedWork[this.state.transformedWork.length - 1].output;
        // this is kinda insane, should be able to just update the transformers
        // TODO: can we render the GridComponents based on the transformers?
        // Should we store a single copy of the transformers alongside the data?
        let transformedWork = this.state.transformedWork.concat({transformer: newTransformer, output:finalData});
        this.setState({ transformedWork: transformedWork });
    }

    render() {
        return <Layout title={`New Transformation`}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div className="mt-2" style={{ display: "grid", justifyItems: "start", gridTemplateColumns: "auto 20rem ", gridTemplateRows: "auto auto" }}>
                <div className="text-lg" style={{alignSelf: "center", gridColumnStart:1}}>Name: </div>
                <div className="text-lg my-2" style={{alignSelf: "center", gridColumnStart:1, gridRowStart:2}}>Status:</div>
                    
                    <span style={{alignSelf: "center", justifySelf:"start", gridColumnStart:2, gridRowStart:1}}
                    className="px-2 py-1 text-lg font-bold inline-block border ">
                        2PM Bloomberg Import</span>

                        <span style={{alignSelf: "center", justifySelf:"start", gridColumnStart:2, gridRowStart:2}}
                    className="px-1 py-1 text-lg font-bold text-red-light inline-block ">
                        Unsaved</span>
                    
{/* 
                    <div className="text-lg my-2">Status: <span className="text-red-light px-2 py-1  border">Unsaved</span>
                    
                    </div> */}
                </div>
                <div className="flex justify-end">
                    <div className="pt-3">
                    <button onClick={this.addTransformation.bind(this)} className="mx-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
                            <i className="fas fa-plus pr-1"> </i>
                            Add Step
                        </button>
                        <button className="mx-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
                            <i className="fas fa-save pr-1"> </i>
                            Save Transformation
                        </button>
                    </div>
                </div>
            </div>

            <GridComponent title="Example Data" editable={true} rowData={this.state.initialData} 
            onCellValueChanged={this.onInitialDataChanged.bind(this)}/>

            {this.state.transformedWork.map((tw, index) =>
                <GridComponent key={index} title={`Step ${index + 1}`} rowData={tw.output} transformer={tw.transformer}
                    onTransformerChanged={this.onTransformerChanged(index)}
                />)}
        </Layout>
    }

}

export default withRouter(NewWithSsr)