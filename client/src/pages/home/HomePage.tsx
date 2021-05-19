import React from 'react'
import Header from '../../components/header/Header'
import Hero from '../../components/hero/Hero'
import SelectedMovie from '../../components/selectedMovie/SelectedMovie'
import PopularMovies from '../../components/popularMovies/PopularMovies'
import SpecialOffers from '../../components/specialOffers/SpecialOffers'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <SelectedMovie />
      <PopularMovies />
      <SpecialOffers />
    </>
  )
}

export default HomePage
