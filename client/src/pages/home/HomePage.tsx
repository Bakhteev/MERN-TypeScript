import React from 'react'
import Header from '../../components/header/Header'
import Hero from '../../components/hero/Hero'
import RecentWatchedCard from '../../components/recentWatched/RecentWatchedCard'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <RecentWatchedCard/>
    </>
  )
}

export default HomePage
