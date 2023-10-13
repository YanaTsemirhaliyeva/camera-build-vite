import { CameraCategory } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCategory } from '../../store/cameras/cameras.slice';
import { getCurrentFilterCategory } from '../../store/cameras/cameras.selectors';

function FilterCategory(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(getCurrentFilterCategory);

  const handleCategoryInputClick = (type: CameraCategory) => {
    dispatch(setActiveCategory(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="photocamera"
            checked={activeCategory === CameraCategory.Photocamera}
            onChange={() => handleCategoryInputClick(CameraCategory.Photocamera)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="videocamera"
            checked={activeCategory === CameraCategory.Videocamera}
            onChange={() => handleCategoryInputClick(CameraCategory.Videocamera)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}

export default FilterCategory;
