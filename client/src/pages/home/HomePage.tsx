import React from 'react'
import Header from '../../components/header/Header'
import Hero from '../../components/hero/Hero'
import SelectedMovie from '../../components/selectedMovie/SelectedMovie'
import PopularMovies from '../../components/popularMovies/PopularMovies'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <SelectedMovie />
      <PopularMovies />
    </>
  )
}

export default HomePage
