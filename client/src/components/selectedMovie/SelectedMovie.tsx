import React from 'react'
import {Link} from 'react-router-dom'
import SelectedMovieCard from './selectedMovieCard/SelectedMovieCard'

const SelectedMovie: React.FC = () => {

  return (
    <section className="selectedMovie">
      <div className="container">
        <div className="selectedMovie__content">
          <div className="selectedMovie__head row">
            <div className="selectedMovie__left">
              <h2 className="selectedMovie__title">Selected Movies</h2>
              <p className="selectedMovie__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
            </div>
            <div className="selectedMovie__right">
              <Link to='/movie' className="selectedMovie__btn">View More</Link>
            </div>
          </div>
          <div className="selectedMovie__row row">
            <SelectedMovieCard />
            <SelectedMovieCard />
            <SelectedMovieCard />
            <SelectedMovieCard />
            <SelectedMovieCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SelectedMovie
