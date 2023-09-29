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
    page = currentPage;
  }
  if (page > pageCount) {
    page = 1;
  }

  const modulo = page % MAX_PAGES_COUNT_PER_PAGE;
  const activePageForward = () => {
    if (modulo === 1) {
      return page + 3;
    }
    if (modulo === 2) {
      return page + 2;
    }
    return page + 1;
  };

  const activePageBack = () => {
    if (modulo === 1) {
      return page - 1;
    }
    if (modulo === 2) {
      return page - 2;
    }
    return page - 3;
  };

  const activeFirstSlice = useMemo(() => {
    if (page === 0) {
      return 0;
    }
    if (page === 1) {
      return page - 1;
    }
    if (modulo === 1) {
      return page - 1;
    }
    if (modulo === 2) {
      return page - 2;
    }
    return page - 3;
  }, [modulo, page]);

  const [firstSlice, setFirstSlice] = useState<number>(activeFirstSlice);
  const [secondSlice, setSecondSlice] = useState<number>(firstSlice + MAX_PAGES_COUNT_PER_PAGE);
  const pagination = [...Array(pageCount).keys()].slice(firstSlice, secondSlice);

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {page > MAX_PAGES_COUNT_PER_PAGE &&
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text"
            to='#'
            onClick={() => {
              setFirstSlice(firstSlice - MAX_PAGES_COUNT_PER_PAGE);
              setSecondSlice(secondSlice - MAX_PAGES_COUNT_PER_PAGE);
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
        {pageCount > 3 && pageCount > secondSlice &&
         <li className="pagination__item">
           <Link className="pagination__link pagination__link--text"
             onClick={() => {
               setSecondSlice(secondSlice + MAX_PAGES_COUNT_PER_PAGE);
               setFirstSlice(firstSlice + MAX_PAGES_COUNT_PER_PAGE);
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
