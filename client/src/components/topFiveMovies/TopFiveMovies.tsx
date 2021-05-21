import React from 'react'
import Filter from '../filter/Filter'

const TopFiveMovies: React.FC = () => {
  return (
    <section className="topFiveMovies">
      <div className="container">
        <div className="topFiveMovies__content">
          <div className="topFiveMovies__row row">
            <h2 className="topFiveMovies__tit">Top 5 Movies</h2>
            <Filter />
          </div>
          <div className="row">
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopFiveMovies
