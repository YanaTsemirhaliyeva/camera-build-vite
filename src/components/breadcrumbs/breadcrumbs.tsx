import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  page: AppRoute;
  cameraTitle?: string;
}
function Breadcrumbs({page, cameraTitle}: BreadcrumbsProps): JSX.Element {

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Index}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {page === AppRoute.Index ?
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li> :
            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Index}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">{cameraTitle}</span>
              </li>
            </>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
