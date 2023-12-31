import { Camera } from '../../types/camera';
import SimilarCard from '../similar-card/similar-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import './similar-products.css';

type SimilarProductsProps = {
  similars: Camera[];
  setCurrentCamera: (arg: Camera) => void;
  setIsModalActive: (arg: boolean) => void;
}

function SimilarProducts({similars, setCurrentCamera, setIsModalActive}: SimilarProductsProps): JSX.Element {

  return (
    <section className="product-similar">
      <div className="container" style={{minWidth: '1150px'}}>
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <Swiper
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
            >
              {similars.map((camera) => (
                <SwiperSlide key={camera.vendorCode}>
                  <SimilarCard card={camera} style={{ width: '100%', margin: 0 }} setCurrentCamera={setCurrentCamera} setIsModalActive={setIsModalActive} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            style={{pointerEvents: 'auto'}}
            disabled
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            style={{pointerEvents: 'auto'}}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
