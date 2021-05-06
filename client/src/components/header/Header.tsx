import React from 'react'
import Logo from '../../assets/header/logo.svg'

const Header: React.FC = () => {
  const links: string[] = ['Home', 'Movies', 'Live', 'Series', 'Kids']

  return (
    <header className="header">
      <div className="container">
        <div className="header__content row">
          <img src={Logo} alt="" className="header__logo" />
          <label>
            <input
              className="header__search"
              type="text"
              placeholder="Search titles here..."
            />
          </label>
          <nav className="header__nav">
            <ul className="header__list flex">
              {links.map((link) => {
                return (
                  <li key={link}>
                    <a className="header__link" href="/">
                      {link}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="header__buttons">
            <button className="header__btn btn-transparent">Sign in</button>
            <button className="header__btn btn-blue">Register</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
