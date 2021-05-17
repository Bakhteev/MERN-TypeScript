import React, { useState } from 'react'

const SelectedMovieCard: React.FC = () => {

  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(active ? false : true)
  }

  return (
    <div onClick={handleClick} className="selectedMovieCard">
      <img className="selectedMovieCard__img" src="" alt="" />
      <div className={`selectedMovieCard-active ${active ? 'active' : ''}`}>

      </div>
    </div>
  )
}

export default SelectedMovieCard
