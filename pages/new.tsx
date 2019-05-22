import dynamic from 'next/dynamic'
import { Component } from 'react';


class NewPage extends Component {    
    render() {
        return <DynamicComponentWithNoSSR />
    }
}

// SSR breaks the Ace editor, sigh
const DynamicComponentWithNoSSR = dynamic(
  () => (import('./newWithSsr')),
  {
    ssr: false
  }
)

export default NewPage