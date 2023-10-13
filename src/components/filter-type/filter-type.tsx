import { CameraCategory, CameraTypes, CameraTypesEng } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilterCategory, getCurrentFilterType } from '../../store/cameras/cameras.selectors';
import { changeFilterType } from '../../store/cameras/cameras.slice';

function FilterType(): JSX.Element {
  const dispatch = useAppDispatch();
  const isActiveCategoryVideo = useAppSelector(getCurrentFilterCategory) === CameraCategory.Videocamera;
  const activeType = useAppSelector(getCurrentFilterType);

  const handleTypeChange = (type: CameraTypes) => {
    dispatch(changeFilterType(type));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(CameraTypes).map((type) => {
        const isTypeDisabled = isActiveCategoryVideo && (type === CameraTypes.Snapshot || type === CameraTypes.Film);
        return (
          <div className="custom-checkbox catalog-filter__item" key={CameraTypesEng[type]}>
            <label>
              <input type="checkbox"
                name={CameraTypesEng[type]}
                disabled={isTypeDisabled}
                checked={activeType.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{type}</span>
            </label>
          </div>);
      })}
    </fieldset>
  );
}

export default FilterType;
