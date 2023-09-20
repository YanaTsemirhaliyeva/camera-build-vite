import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Index}
          element={<CatalogScreen />}
        />
        <Route
          path={`${AppRoute.Product}/:itemId`}
          element={<ProductScreen />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
