import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { QueryParams } from '../../types/query-params';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActivePage } from '../../store/cameras/cameras.slice';
import { ITEMS_PER_PAGE, MAX_PAGES_COUNT_PER_PAGE } from '../../const';
import { getActivePageNumber } from '../../store/cameras/cameras.selectors';

type PaginationProps = {
  totalCountCameras: number;
}

function Pagination({totalCountCameras}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = useAppSelector(getActivePageNumber);
  const currentPage = Number(searchParams.get('page'));
  const pageCount = Math.ceil(totalCountCameras / ITEMS_PER_PAGE);

  const currentParams = useMemo(() => {
    const params: QueryParams = {};
    if (activePage) {
      params.page = activePage.toString();
    }
    return params;
  }, [activePage]);

  useEffect(() => {
    if(currentPage && Number(currentPage) <= pageCount) {
      dispatch(setActivePage(Number(currentPage)));
    }
  }, [currentPage, dispatch, pageCount]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

  let page = Number(location.search.split('=')[1]);

  if (isNaN(page)) {
    page = activePage;
  }
  if (page > pageCount) {
    page = 1;
  }

  const activePageForward = () => page + 1;

  const activePageBack = () => page - 1;

  const activeFirstSlice = (pageNumber: number) => {
    const modulo = pageNumber % MAX_PAGES_COUNT_PER_PAGE;
    if (pageNumber <= 3) {
      return 0;
    }
    if (modulo === 1) {
      return pageNumber - 1;
    }
    if (modulo === 2) {
      return pageNumber - 2;
    }
    return pageNumber - 3;
  };

  const [firstSlice, setFirstSlice] = useState<number>(0);
  const pagination = [...Array(pageCount).keys()].slice(firstSlice, firstSlice + MAX_PAGES_COUNT_PER_PAGE);

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {page > 1 &&
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text"
            to='#'
            onClick={() => {
              setFirstSlice(activeFirstSlice(page - 1));
              dispatch(setActivePage(activePageBack()));
            }}
          >
            Назад
          </Link>
        </li>}
        {pagination.map((item) => (
          <li className="pagination__item"
            key={item}
            onClick={() => {
              dispatch(setActivePage(item + 1));
            }}
          >
            <Link
              className={`pagination__link ${page === item + 1 ? 'pagination__link--active' : ''}`}
              to='#'
              data-testid='pagination-page'
            >
              {item + 1}
            </Link>
          </li>
        ))}
        {pageCount > 3 && page < pageCount &&
         <li className="pagination__item">
           <Link className="pagination__link pagination__link--text"
             onClick={() => {
               setFirstSlice(activeFirstSlice(page + 1));
               dispatch(setActivePage(activePageForward()));
             }}
             to='#'
           >Далее
           </Link>
         </li>}
      </ul>
    </div>
  );
}

export default Pagination;
