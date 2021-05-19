import React from 'react'
import SpecialOffersCard from './specialOffersCard/SpecialOffersCard'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'

const SpecialOffers: React.FC = () => {

  SwiperCore.use([Navigation])

  return (
    <section className="specialOffers">
      <div className="container">
        <div className="specialOffers__content">
          <div className="specialOffers__head">
            <h2 className="specialOffers__title">Special Offers</h2>
            <p className="specialOffers__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br /> incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="specialOffers__row flex">
            <Swiper navigation={true} spaceBetween={10} slidesPerView={3}>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
              <SwiperSlide><SpecialOffersCard></SpecialOffersCard></SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialOffers
