import { CameraLevel, CameraLevelEng } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilterLevel } from '../../store/cameras/cameras.selectors';
import { changeFilterLevel } from '../../store/cameras/cameras.slice';

function FilterLevel(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeLevel = useAppSelector(getCurrentFilterLevel);

  const handleLevelChange = (level: CameraLevel) => {
    dispatch(changeFilterLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.values(CameraLevel).map((level) => (
        <div className="custom-checkbox catalog-filter__item" key={CameraLevelEng[level]}>
          <label>
            <input type="checkbox"
              name={CameraLevelEng[level]}
              onChange={() => handleLevelChange(level)}
              checked={activeLevel.includes(level)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterLevel;
