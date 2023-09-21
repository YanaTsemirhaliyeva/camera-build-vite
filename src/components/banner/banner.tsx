import { Link } from 'react-router-dom';
import { Promo } from '../../types/promo';
import { AppRoute } from '../../const';

type BannerProps = {
  promoItem: Promo;
}

function Banner({promoItem}: BannerProps): JSX.Element {

  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, id} = promoItem;
  const sourceSrcSet = `${previewImgWebp}, ${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={sourceSrcSet} />
        <img src={previewImg} srcSet={imgSrcSet} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn"
          to={`${AppRoute.Product}/${id}`}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
