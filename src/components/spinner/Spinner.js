/* eslint-disable */
import React from 'react'
import { Spin } from 'antd'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='spinner'>
      <Spin size='large' tip='Loading...' />
    </div>
  )
}

export default Spinner
