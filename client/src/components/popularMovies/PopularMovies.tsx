import React from 'react'
import { Link } from 'react-router-dom'

const PopularMovies: React.FC = () => {
  return (
    <section className="popularMovies">
      <div className="container">
        <div className="popularMovies__content">
          <div className="popularMovies__head row">
            <h2 className="popularMovies__title">Popular Movies</h2>
            <Link to='/movie' className="selectedMovie__btn">View More</Link>
          </div>
          <div className="popularMovies__row flex">
            <div className="popularMovies__film popularFilm main">
              <div className="popularFilm__info">
                <h3 className="popularFilm__title">TAKE OUT <br /> TANGO</h3>
                <span className="popularFilm__season">SEASON 2</span>
                <ul className="popularFilm__row row">
                  <li className="popularFilm__item">DRAMA</li>
                  <li className="popularFilm__item">2017</li>
                  <li className="popularFilm__item">ENGLAND</li>
                  <li className="popularFilm__item">1hr 2min</li>
                </ul>
              </div>
            </div>
            <div className="popularMovies__film pre-main"></div>
          </div>
          <div className="popularMovies__row flex">
            <div className="popularMovies__film"></div>
            <div className="popularMovies__film"></div>
            <div className="popularMovies__film"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularMovies