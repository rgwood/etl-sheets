import '../styles/index.css'
import Layout from '../components/Layout'
import { withRouter, SingletonRouter } from 'next/router';
import { Component } from 'react';
import { NextContext } from 'next';
import AceEditor, { EditorProps, AceEditorProps } from 'react-ace';

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
                      startRow: 2,
                      startCol: 3,
                      endRow: 2,
                      endCol: 6,
                      className: 'text-red',
                      type: 'error'
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