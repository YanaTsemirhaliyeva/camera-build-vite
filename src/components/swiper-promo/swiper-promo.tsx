import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/promo.selectors';
import Banner from '../banner/banner';
import './swiper-promo.css';

function SwiperPromo(): JSX.Element {

  const promoList = useAppSelector(getPromo);

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {promoList.length > 0 && promoList.map((item) => (
        <SwiperSlide key={item.id} data-testid='swiper'>
          <Banner promoItem={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperPromo;
