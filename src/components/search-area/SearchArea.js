/* eslint-disable */
import React from 'react'
import { Input } from 'antd'
import './SearchArea.css'

const SearchArea = (props) => {
  return (
    <div>
      <Input placeholder='Type to search...' onKeyUp={props.handleKeyUp} />
    </div>
  )
}

export default SearchArea
