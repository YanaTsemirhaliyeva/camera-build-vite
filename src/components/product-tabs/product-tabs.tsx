import classNames from 'classnames';
import { ProductInfoURL } from '../../const';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CameraInfo } from '../../types/camera';

type ProductTabsProps = {
  tabsInfo: CameraInfo;
}

function ProductTabs({tabsInfo}: ProductTabsProps): JSX.Element {
  const {vendorCode, type, level, category, description} = tabsInfo;
  const [params, setParams] = useSearchParams();
  const currentInfo = params.get('about');
  const [cameraInfo, setCameraInfo] = useState<ProductInfoURL>(() => {
    switch (currentInfo) {
      case null:
        return ProductInfoURL.Description;
      case ProductInfoURL.Description:
        return ProductInfoURL.Description;
      case ProductInfoURL.Characteristics:
        return ProductInfoURL.Characteristics;
      default:
        return ProductInfoURL.Description;
    }
  });

  const handleCharacteristicsClick = () => {
    setCameraInfo(ProductInfoURL.Characteristics);
    setParams({ about: ProductInfoURL.Characteristics }, { replace: true });
  };

  const handlekDescriptionClick = () => {
    setCameraInfo(ProductInfoURL.Description);
    setParams({ about: ProductInfoURL.Description }, { replace: true });
  };

  useEffect(() => {
    if (!currentInfo) {
      setParams({ about: ProductInfoURL.Description }, { replace: true });
      setCameraInfo(ProductInfoURL.Description);
    }
  }, [currentInfo, setParams]);


  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={classNames({'is-active': cameraInfo === ProductInfoURL.Characteristics}, 'tabs__control')}
          type="button"
          onClick={handleCharacteristicsClick}
        >
          Характеристики
        </button>
        <button
          className={classNames({'is-active': cameraInfo === ProductInfoURL.Description}, 'tabs__control')}
          type="button"
          onClick={handlekDescriptionClick}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={classNames({'is-active': cameraInfo === ProductInfoURL.Characteristics}, 'tabs__element')}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={classNames({'is-active': cameraInfo === ProductInfoURL.Description}, 'tabs__element')}>
          <div className="product__tabs-text">
            <p>{description.split('.')[0]}.</p>
            {description.split('.').length > 1 && <p>{description.split('.').slice(1).join('.')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
