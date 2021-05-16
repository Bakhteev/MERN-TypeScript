import React from 'react'
import Header from '../../components/header/Header'
import Hero from '../../components/hero/Hero'
import SelectedMovie from '../../components/selectedMovie/SelectedMovie'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <SelectedMovie />
    </>
  )
}

export default HomePage
