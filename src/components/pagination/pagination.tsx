import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setActivePage } from '../../store/cameras/cameras.slice';
import { useMemo, useState } from 'react';
import { ITEMS_PER_PAGE, MAX_PAGES_COUNT_PER_PAGE } from '../../const';

type PaginationProps = {
  totalCountCameras: number;
  currentPage: number;
}

function Pagination({totalCountCameras, currentPage}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(totalCountCameras / ITEMS_PER_PAGE);
  const location = useLocation();
  let page = Number(location.search.split('=')[1]);
  if (isNaN(page)) {
    page = currentPage;
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
    <div className="pagination">
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
