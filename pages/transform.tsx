import dynamic from 'next/dynamic'
import { Component } from 'react';


class Transform extends Component {    
    render() {
        return <DynamicComponentWithNoSSR />
    }
}

// SSR breaks the Ace editor, sigh
const DynamicComponentWithNoSSR = dynamic(
  () => import('./transformWithSsr'),
  {
    ssr: false
  }
)

export default Transform

// function Transform() {
//   return (
//     <DynamicComponentWithNoSSR/>
//   )
// }

// export default Transform