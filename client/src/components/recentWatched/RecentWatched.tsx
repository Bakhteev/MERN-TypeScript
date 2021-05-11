import React from 'react'
import RecentWatchedCard from './recentWatchedCard/RecentWatchedCard'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

const RecentWatched: React.FC = () => {

  SwiperCore.use([Pagination, Navigation])

  return (
    <div className="recentWatched">
      <h2 className="recentWatched__title">Recent Watched</h2>
      <div className="recentWatched__row">
        <Swiper pagination={{
          'dynamicBullets': true
        }} navigation={true} spaceBetween={10} slidesPerView={4}>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
          <SwiperSlide><RecentWatchedCard></RecentWatchedCard></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default RecentWatched
