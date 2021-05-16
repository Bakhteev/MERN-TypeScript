import React from 'react'

const SelectedMovieCard: React.FC = () => {

  const sayHello = (el:any ): void => {
    alert('Hello')
  }

  return (
    <div onMouseMove={sayHello} className="selectedMovieCard">
      <img src="" alt="" />
      <div className="selectedMovieCard-active">

      </div>
    </div>
  )
}

export default SelectedMovieCard
