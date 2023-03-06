/*eslint-disable*/
import React from 'react'
import { Alert } from 'antd'
import './OfflineAlert.css'

const OfflineAlert = () => {
  return (
    <div className='offline-alert'>
      <Alert message="You're offline. Please, check your connection." type='error' showIcon />
    </div>
  )
}

export default OfflineAlert
