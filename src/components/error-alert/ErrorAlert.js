/*eslint-disable*/
import React from 'react'
import { Alert, Space } from 'antd'
import './ErrorAlert.css'

const ErrorAlert = (props) => {
  return (
    <div className='error-alert'>
      <Alert
        message={`Sorry, something went wrong. We're working on it right now. Please, come back later.`}
        type='error'
        showIcon
      />
    </div>
  )
}

export default ErrorAlert
