import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FilmIcon from './filmIcon'
import GenreIcon from './genreIcon'
import UsersIcon from './usersIcon'
import './_style.scss'

const AdminSidebar = () => {
  const [active, setActive] = useState<number>()
  const [open, setOpen] = useState(false)
  const items = [
    {
      link: '/admin/createFilm',
      icon: <FilmIcon />,
      text: 'Create Film',
      id: 1,
    },
    {
      link: '/admin/createCategory',
      icon: <GenreIcon />,
      text: 'Create Category',
      id: 2,
    },
    {
      link: '/admin/createGenre',
      icon: <GenreIcon />,
      text: 'Create Genre',
      id: 3,
    },
    {
      link: '/admin/userTable',
      icon: <UsersIcon />,
      text: 'User Table',
      id: 4,
    },
  ]

  const burger = () => {
    setOpen(open ? false : true)
  }

  return (
    <aside className={`sidebar ${open ? 'active' : ''}`}>
      <div className="sidebar__burger" onClick={burger}>
        <span className={`sidebar__line ${open ? 'active' : ''}`}></span>
      </div>
      <ul className="sidebar__list">
        {items.map((item) => (
          <li
            className={`sidebar__item ${active === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => setActive(item.id)}
          >
            <Link to={item.link}>
              <i>{item.icon}</i> <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default AdminSidebar
