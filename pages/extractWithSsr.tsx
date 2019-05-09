import '../styles/index.css'
import Layout from '../components/Layout'
import { withRouter, SingletonRouter } from 'next/router';
import { Component } from 'react';
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
      <div className="pt-3 pb-1 text-alloy-teal-light text-lg font-bold">Summary</div>
      {this.property('Type','Bloomberg Extraction')}
      {this.property('Start time','2019-05-24 13:27:29')}
      {this.property('Failure time','2019-05-24 13:27:55 (duration: 26s)')}
      {this.property('Raw file',<Link href=''><a>link</a></Link>)}

      <div className="pt-3 pb-1 text-alloy-teal-light text-lg font-bold">Details</div>
      <div className="pt-2 text-alloy-teal-dark">Error extracting CSV file at line 238, column 38: <span className="font-bold">expected ',' before token</span></div>
      <div className="my-2 p-1 border rounded-sm shadow">
        <AceEditor
          mode="text"
          theme="textmate"
          //  onChange={this.onAceEditorChanged.bind(this)}
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

// export default withRouter(Extract)