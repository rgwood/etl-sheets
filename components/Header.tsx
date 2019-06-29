import HeaderElement from './HeaderElement'

const Header = () => {
  return <div className="mb-4">
  <HeaderElement href='/' text='Home' extraClasses='mr-2' notificationCount={2}  ></HeaderElement>
  <HeaderElement href='/extractDashboard' text='Extracts' extraClasses='mr-2'></HeaderElement>
  <HeaderElement href='/transformDashboard' text='Transforms' extraClasses='mr-2' ></HeaderElement>
  <HeaderElement href='/new' text='New' extraClasses='mr-2'  ></HeaderElement>
  </div>;
}

export default Header