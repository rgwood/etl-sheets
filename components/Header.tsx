import Link from 'next/link'

const Header = () => (
  <div className="mb-4">
    <Link href="/extractDashboard">
      <a className="p-2 shadow rounded bg-white hover:bg-grey-lighter text-lg text-purple-dark no-underline">Extract Dashboard</a>
    </Link>
    <Link href="/">
      <a className="relative p-2 ml-2 shadow rounded bg-white hover:bg-grey-lighter text-lg text-purple-dark no-underline">Transform Dashboard
      <span className="absolute pin-t pin-r flex w-4 h-4 -mt-2 -mr-2 justify-center items-center text-xs font-medium text-red-lightest bg-red rounded-full">1</span>
      </a>
    </Link>
    <Link href="/about">
      <a className="p-2 ml-2 shadow rounded bg-white hover:bg-grey-lighter text-lg text-purple-dark no-underline">About</a>
    </Link>
  </div>
)

export default Header