import { Helmet } from 'react-helmet-async';
import MemoHeader from '../header/header';
import MemoFooter from '../footer/footer';
import { memo } from 'react';

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
      <MemoHeader />
      {children}
      <MemoFooter />
    </div>
  );
}

const MemoLayout = memo(Layout);
export default MemoLayout;
