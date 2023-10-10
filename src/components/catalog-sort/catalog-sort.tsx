import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortOrder, SortType } from '../../const';
import { getCurrentSortOrder, getCurrentSortType } from '../../store/cameras/cameras.selectors';
import { changeSortOrder, changeSortType } from '../../store/cameras/cameras.slice';
import { useMemo } from 'react';
// import { useLocation } from 'react-router-dom';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  // const currentType = location.search

  const handleTypeClick = useMemo(() => (value: SortType) => {
    dispatch(changeSortType(value));
  }, [dispatch]);

  const handleOrderClick = useMemo(() => (value: SortOrder) => {
    dispatch(changeSortOrder(value));
  }, [dispatch]);


  return (
    <div className="catalog-sort" data-testid='catalog-sort'>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.entries(SortType).map(([type, value]) => (
              <div className="catalog-sort__btn-text" key={type}>
                <input type="radio" id={`sort${type}`} name="sort"
                  onChange={() => handleTypeClick(value)}
                  checked={value === currentSortType}
                />
                <label htmlFor={`sort${type}`}>{value}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.entries(SortOrder).map(([type, value]) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`} key={type}>
                <input type="radio" id={type.toLowerCase()} name="sort-icon" aria-label={value}
                  onChange={() => handleOrderClick(value)}
                  checked={currentSortOrder === value}
                />
                <label htmlFor={type.toLowerCase()}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
