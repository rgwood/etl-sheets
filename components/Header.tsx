import Link from 'next/link'

const Header = () => (
  <div className="mb-4">
    <Link href="/">
      <a className="p-2 shadow rounded bg-white hover:bg-grey-lighter text-lg text-purple-dark no-underline">Home</a>
    </Link>
    <Link href="/about">
      <a className="p-2 mx-2 shadow rounded bg-white hover:bg-grey-lighter text-lg text-purple-dark no-underline">About</a>
    </Link>
  </div>
)

export default Header