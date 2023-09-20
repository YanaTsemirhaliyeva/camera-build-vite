import { Helmet } from 'react-helmet-async';
import Header from '../header/header';
import Footer from '../footer/footer';

type LayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
}

function Layout({pageTitle, children}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>{pageTitle} &#8211; Фотошоп</title>
      </Helmet>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
