import dynamic from 'next/dynamic'
import { Component } from 'react';


class Extract extends Component {    
    render() {
        return <DynamicComponentWithNoSSR />
    }
}

// SSR breaks the Ace editor, sigh
const DynamicComponentWithNoSSR = dynamic(
  () => import('./extractWithSsr'),
  {
    ssr: false
  }
)

export default Extract