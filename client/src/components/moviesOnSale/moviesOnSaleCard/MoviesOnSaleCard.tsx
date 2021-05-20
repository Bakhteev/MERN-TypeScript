import React from 'react'

const MoviesOnSaleCard: React.FC = () => {
  return (
    <div className="moviesOnSaleCard">
      <div className="moviesOnSaleCard__img">
        <span className="moviesOnSaleCard__sale">40%</span>
      </div>
      <div className="moviesOnSaleCard__info">
        <span className="moviesOnSaleCard__name">Take Out Tango</span>
        <div className="row">
          <span className="moviesOnSaleCard__item">2018</span>
          <span className="moviesOnSaleCard__item">2h 3m</span>
        </div>
        <div className="moviesOnSaleCard__row row">
          <span className="moviesOnSaleCard__rating"><span className="moviesOnSaleCard__rating-a">6.8</span></span>
          <div className="moviesOnSaleCard__prices">
            <span className="moviesOnSaleCard__price">$56.4</span>
            <span className="moviesOnSaleCard__price-old">$98.4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesOnSaleCard
