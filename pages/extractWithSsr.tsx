import '../styles/index.css'
import Layout from '../components/Layout'
import { withRouter, SingletonRouter } from 'next/router';
import { Component, CSSProperties } from 'react';
import { NextContext } from 'next';
import AceEditor, { EditorProps, AceEditorProps, Marker } from 'react-ace';
import Link from 'next/link';



class Extract extends Component<{ router: SingletonRouter }> {
  // constructor(props: any) {
  //   super(props);
  // }
  //   static async getInitialProps({query}: NextContext) {
  //     console.log({query});
  // }

  property = (name: string, value: JSX.Element | string) => <div><span className="text-grey-darker">{name}:</span> {value}</div>;

  render() {
    let query = this.props.router.query;
    return <Layout title={`Extract Failure: ${query.id}`}>
      {/* <img className="pt-3" src="../static/pikachuconstruction.gif"></img> */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div className="header">Summary</div>
          {this.property('Type', 'Bloomberg Extraction')}
          {this.property('Start time (UTC)', '2019-05-24 13:27:29')}
          {this.property('Failure time (UTC)', '2019-05-24 13:27:55 (duration: 26s)')}
        </div>
        <div>
          <div className="header">Top-Level Actions</div>
          <button className="bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
            Retry From Start
          </button>
          <button className="mx-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white font-bold py-2 px-4 rounded">
            Mark Success
          </button>
        </div>
      </div>

      <div className="header">Details</div>

      <div className="subheader pt-1">► Download from FTP <span className="text-green italic">succeeded</span></div>
      {/* Downloaded file from ftp.bloomberg.com blah blah */}
      <div className="subheader pt-1">▼ Extract CSV <span className="text-red italic">failed</span> 
      <button className="ml-4 bg-alloy-teal-light hover:bg-alloy-teal-dark text-white  text-xs font-bold py-1 px-2 rounded">
            Retry
          </button>
          <button className="ml-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-xs text-white font-bold py-1 px-2 rounded">
          Download CSV
          </button>
          <button className="ml-1 bg-alloy-teal-light hover:bg-alloy-teal-dark text-xs text-white font-bold py-1 px-2 rounded">
            Upload Fixed CSV
          </button>
      </div>

      <div className="py-1">Attempted to extract CSV file <span className="italic">2019-03-12-21-05-00-0983495778.out</span>. </div>
      <div className="py-1 text-alloy-teal-dark">Failure at line 238, column 38: <span className="font-bold">expected ',' before token</span></div>
      <div className="my-2 p-1 border rounded-sm shadow">
        <AceEditor
          mode="text"
          theme="textmate"
          fontSize={12}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={false}
          value={
            `'AAPL Equity',123.45,123.67,'This is a well-formed note'
'GOOG Equity',234.45,234.56,'This isn't a well-formed note'
'MSFT Equity',345.45,345.56,'This is a well-formed note'`}
          markers={[{
            startRow: 1,
            startCol: 38,
            endRow: 1,
            endCol: 400,
            className: 'highlight-error',
            type: 'text'
          }]}
          annotations={[{ row: 1, column: 2, type: 'error', text: 'test' }]}
          setOptions={{
            highlightActiveLine: false,
            readOnly: true,
            highlightGutterLine: false,
            showLineNumbers: true,
            firstLineNumber: 237,
            tabSize: 2,
            maxLines: 100
          }} />
      </div>
    </Layout>

  }
}

export default withRouter(Extract);