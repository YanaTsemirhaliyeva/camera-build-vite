import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import { isCamerasDataStatusLoading } from '../../store/cameras/cameras.selectors';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {

  const isCamerasDataLoading = useAppSelector(isCamerasDataStatusLoading);

  if (isCamerasDataLoading) {
    return <Spinner/>;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Index}
          element={<CatalogScreen />}
        />
        <Route
          path={`${AppRoute.Product}/:cameraId`}
          element={<ProductScreen />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
