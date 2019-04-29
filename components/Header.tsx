import ActiveLink from './ActiveLink'

const Header = () => {
  return <div className="mb-4">
  <ActiveLink href='/' text='Home' extraClasses='mr-2' ></ActiveLink>
  <ActiveLink href='/extractDashboard' text='Extracts' extraClasses='mr-2'></ActiveLink>
  <ActiveLink href='/transformDashboard' text='Transforms' extraClasses='mr-2' notificationCount={1} ></ActiveLink>
  <ActiveLink href='/about' text='About' extraClasses='mr-2'  ></ActiveLink>
  </div>;
}

export default Header