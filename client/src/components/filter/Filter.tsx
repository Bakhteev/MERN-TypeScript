import React, {useState} from 'react'
import { filterNames } from './filterNames'
import {useSelector} from 'react-redux'

const Filter: React.FC = () => {
  return (
    <div className='filter'>
      <ul className='filter__list row'>
        {filterNames.map( item => {
          return (
            <li
              key={item}
              className='filter__item'>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Filter