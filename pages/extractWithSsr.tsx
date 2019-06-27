import '../styles/index.css'
import Layout from '../components/Layout'
import { withRouter, SingletonRouter } from 'next/router';
import { Component, CSSProperties } from 'react';
import { NextContext } from 'next';
import AceEditor, { EditorProps, AceEditorProps, Marker } from 'react-ace';
import Link from 'next/link';



class Extract extends Component<{ router: SingletonRouter }> {

  property = (name: string, value: JSX.Element | string) => <div className="my-1">
    <span className="text-grey-darker font-bold">{name}:</span> {value}
  </div>;

  render() {
    let query = this.props.router.query;
    return <Layout title={`Extract Failure: ${query.id}`} error={true}>
      {/* <img className="pt-3" src="../static/pikachuconstruction.gif"></img> */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="header">Summary</div>
          {this.property('Type', 'Bloomberg Extraction')}
          {this.property('Start time (UTC)', '2019-05-24 13:27:29')}
          {this.property('Failure time (UTC)', '2019-05-24 13:27:55 (duration: 26s)')}
        </div>
        <div className="flex justify-end">
          {/* <div className="header">Top-Level Actions</div> */}
          <div className="pt-3">
          <button className="bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
          <i className="fas fa-redo pr-1"> </i>
            Retry From Start
          </button>
          <button className="mx-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
          <i className="fas fa-check-circle pr-1"> </i>
            Mark As Success
          </button>
          </div>
        </div>
      </div>

      <div className="header">Extract Stages</div>
      <div className="subheader pt-3">► Download from FTP <span className="text-green italic">succeeded</span></div>
      {/* Downloaded file from ftp.bloomberg.com blah blah */}
      <div className="subheader pt-1">▼ Extract CSV <span className="text-red-dark italic">failed</span>
        <button className="fas fa-redo ml-4 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white  text-xs font-bold py-1 px-2 rounded">
          
          </button>
        <button className="ml-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-xs text-white font-bold py-1 px-2 rounded">
          <i className="fas fa-file-download pr-1"> </i>
          Download Raw File
          </button>
        <button className="ml-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-xs text-white font-bold py-1 px-2 rounded">
        <i className="fas fa-file-upload pr-1"> </i>
          Upload Fixed File
          </button>
      </div>
      <div className="pl-5">
        <div className="py-1">Attempted to extract CSV file <span className="italic">2019-03-12-21-05-00-0983495778.out</span>. </div>
        <div className="py-1">Failure at line 238, column 36: <span className="font-bold">expected ',' before token</span></div>
        <div className="my-2 p-1 border rounded-sm shadow">
          <AceEditor
            mode="text"
            theme="textmate"
            fontSize={12}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={false}
            value={
              `"AAPL Equity",123.45,123.67,"A well-formed note"
"GOOG Equity",234.45,234.56,"Not a "well-formed note"
"MSFT Equity",345.45,345.56,"A well-formed note"`}
            markers={[{
              startRow: 1,
              startCol: 36,
              endRow: 1,
              endCol: 400,
              className: 'highlight-error',
              type: 'text'
            }]}
            annotations={[{ row: 1, column: 2, type: 'error', text: 'test' }]}
            setOptions={{
              highlightActiveLine: false,
              // readOnly: true,
              highlightGutterLine: false,
              showLineNumbers: true,
              firstLineNumber: 237,
              tabSize: 2,
              maxLines: 100
            }} />
        </div>
      </div>
    </Layout>

  }
}

export default withRouter(Extract);