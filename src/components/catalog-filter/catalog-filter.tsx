import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { resetFilters } from '../../store/cameras/cameras.slice';
import FilterCategory from '../filter-category/filter-category';
import FilterLevel from '../filter-level/filter-level';
import FilterPrice from '../filter-price/filter-price';
import FilterType from '../filter-type/filter-type';


function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isReset, setIsReset] = useState(false);

  const handleFilterReset = () => {
    setIsReset(true);
    dispatch(resetFilters());
  };


  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <div className="catalog-filter" data-testid='catalog-filter'>
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterPrice resetFilters={isReset} />
        <FilterCategory />
        <FilterType />
        <FilterLevel />
        <button className="btn catalog-filter__reset-btn" type="reset"
          onClick={handleFilterReset}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
