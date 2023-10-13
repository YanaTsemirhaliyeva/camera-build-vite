import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCurrentMaxPrice, getCurrentMinPrice, getFilteredCameraList } from '../../store/cameras/cameras.selectors';
import { getPrice } from '../../utils';
import { setMaxPrice, setMinPrice } from '../../store/cameras/cameras.slice';

type FilterPriceProps = {
  resetFilters: boolean;
};

function FilterPrice({resetFilters}: FilterPriceProps): JSX.Element {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getFilteredCameraList);
  const allCameras = useAppSelector(getCameras);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);

  const minPrice = getPrice(cameras, 'min');
  const maxPrice = getPrice(cameras, 'max');

  const minPriceAll = getPrice(allCameras, 'min');
  const maxPriceAll = getPrice(allCameras, 'max');

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  useEffect(() => {
    if (resetFilters) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [resetFilters]);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +(evt.target.value.replaceAll('-', ''));
    if(evt.target.value === '') {
      setMinPriceValue(+minPriceAll);
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(+(price));
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +(evt.target.value.replaceAll('-', ''));
    if(evt.target.value === '') {
      setMaxPriceValue(+maxPriceAll);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(+price);
  };

  const checkMinPrice = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));
      return;
    }

    if (minPriceValue < +minPrice) {
      setMinPriceValue(+minPrice);
      dispatch(setMinPrice(+minPrice));
      return;
    }

    if (minPriceValue > +maxPrice) {
      setMinPriceValue(+maxPrice);
      dispatch(setMinPrice(+maxPrice));
      return;
    }

    dispatch(setMinPrice(minPriceValue));
  };

  const checkMaxPrice = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));
      return;
    }

    if (maxPriceValue > +maxPrice) {
      setMaxPriceValue(+maxPrice);
      dispatch(setMaxPrice(+maxPrice));
      return;
    }

    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));
      return;
    }

    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleMinPriceBlur = () => {
    checkMinPrice();
  };

  const handleMaxPriceBlur = () => {
    checkMaxPrice();
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      checkMinPrice();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === 'Enter') {
      checkMaxPrice();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price"
              placeholder={`от ${minPrice}`}
              min={Number.MIN_VALUE}
              onChange={handleMinPriceInputChange}
              onKeyDown={handleMinPriceKeyDown}
              onBlur={handleMinPriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp"
              placeholder={`до ${maxPrice}`}
              min={Number.MIN_VALUE}
              onChange={handleMaxPriceInputChange}
              onKeyDown={handleMaxPriceKeyDown}
              onBlur={handleMaxPriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
