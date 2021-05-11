import React from 'react'

const RecentWatchedCard: React.FC = () => {
  return (
    <div className="recentWatchedCard flex">
      <div className="recentWatchedCard__img">

      </div>
      <div className="recentWatchedCard__info">
        <span className="recentWatchedCard__genre">DRAMA SERIES</span>
        <span className="recentWatchedCard__name">Take Out Tango</span>
        <span className="recentWatchedCard__episode">Season 1, Episode 7</span>
      </div>
    </div>
  )
}

export default RecentWatchedCard