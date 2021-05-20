import React from 'react'
import MoviesOnSaleCard from './moviesOnSaleCard/MoviesOnSaleCard'

const MoviesOnSale:React.FC = () => {
  return (
    <section className="moviesOnSale">
      <div className="container">
        <div className="moviesOnSale__content">
          <h2 className="moviesOnSale__title">Movies on Sale</h2>
          <div className="moviesOnSale__row row">
            <MoviesOnSaleCard />
            <MoviesOnSaleCard />
            <MoviesOnSaleCard />
            <MoviesOnSaleCard />
            <MoviesOnSaleCard />
            <MoviesOnSaleCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoviesOnSale
