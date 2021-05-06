import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content row">
          <div className="col-6">
            <ul className="hero__caption caption row">
              <li className="caption__item">ACTION</li>
              <li className="caption__item">2017</li>
              <li className="caption__item">ENGLAND</li>
              <li className="caption__item">1hr 2min</li>
            </ul>
            <h1 className="hero__name">THUNDER STUNT</h1>
            <p className="hero__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris </p>
            <div className="hero__prices prices row">
              <span className="prices__new">$59,6</span>
              <span className="prices__old">$126</span>
            </div>
            <div className="hero__buttons row">
              <button className="hero__btn btn-blue">Watch Now </button>
              <button className="hero__btn btn-transparent">Add to Watchlist</button>
            </div>
          </div>
          <div className="col-6">
            <div className="hero__wrappers-row wrapper flex">
              <div className="hero__wrapper"></div>
              <div className="hero__wrapper hero__wrapper-main">
                <button className="wrapper__btn"></button>
              </div>
              <div className="hero__wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
