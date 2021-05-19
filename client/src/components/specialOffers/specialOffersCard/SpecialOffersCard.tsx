import React from 'react'

const SpecialOffersCard: React.FC = () => {

  const items: string[] = ['2017', 'English', '1hr 2min']

  return (
    <div className="specialOffersCard">
      <div className="specialOffersCard__img"></div>
      <div className="specialOffersCard__info">
        <div className="specialOffersCard__row row">
          <ul className="specialOffersCard__list row">
            {items.map(item => {
              return (
                <li key={item} className="specialOffersCard__item">
                  {item}
                </li>
              )
            })}
          </ul>
          <div>
            <button className="specialOffersCard__biography">BIOGRAPHY</button>
          </div>
        </div>
        <span className="specialOffersCard__name">REWORK</span>
        <p className="specialOffersCard__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris </p>
        <div className="specialOffersCard__row row">
          <div className="specialOffersCard__buttons flex">
            <button className="specialOffersCard__btn watchnow">Watch Now</button>
            <button className="specialOffersCard__btn watchlist"></button>
          </div>
          <div className="specialOffersCard__prices flex">
            <span className="specialOffersCard__price">$21,99</span>
            <span className="specialOffersCard__price-old">$25</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffersCard
