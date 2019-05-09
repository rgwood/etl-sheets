import '../styles/index.css'
import Layout from '../components/Layout'
import { withRouter, SingletonRouter } from 'next/router';
import { Component } from 'react';
import { NextContext } from 'next';
import AceEditor, { EditorProps, AceEditorProps, Marker } from 'react-ace';

class Extract extends Component<{router: SingletonRouter}> {
  // constructor(props: any) {
  //   super(props);
  // }
//   static async getInitialProps({query}: NextContext) {
//     console.log({query});
// }

  render() {
    let query = this.props.router.query;
    return      <Layout title={`Extract ${query.id}`}>
        <img className="pt-3" src="../static/pikachuconstruction.gif"></img>
        <div>Error extracting...</div>
        <div className="my-2 p-1 border rounded-sm shadow">
        <AceEditor
                    mode="text"
                    theme="textmate"
                    //  onChange={this.onAceEditorChanged.bind(this)}
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={false}
                    value={`Test text
Newline
newline`}
                    markers={[{
                      startRow: 1,
                      startCol: 1,
                      endRow: 1,
                      endCol: 5,
                      className: 'highlight-error',
                      type: 'text'
                    }]}
                     annotations={[{row:1, column:2, type:'error', text:'test'}]}
                    setOptions={{
                      highlightActiveLine: false,
                      readOnly: true,
                      highlightGutterLine: false,
                    showLineNumbers: true,
                      firstLineNumber: 237,
                    tabSize: 2,
                     maxLines: 100
                    }}/>
                    </div>
      </Layout>
    
  }
}

export default withRouter(Extract);

// export default withRouter(Extract)