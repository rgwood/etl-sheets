import dynamic from 'next/dynamic'

// SSR breaks the Ace editor, sigh
const DynamicComponentWithNoSSR = dynamic(
  () => import('./transformWithSsr'),
  {
    ssr: false
  }
)

function Transform() {
  return (
    <DynamicComponentWithNoSSR/>
  )
}

export default Transform