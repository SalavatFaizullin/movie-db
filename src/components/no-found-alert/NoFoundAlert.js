/* eslint-disable */
import React from 'react'
import { Alert } from 'antd'
import './NoFoundAlert.css'

const NoFoundAlert = () => {
  return (
    <div className='no-found'>
      <Alert message='Sorry, nothing was found on your request. Please, try again.' type='info' showIcon />
    </div>
  )
}

export default NoFoundAlert
