/* eslint-disable */
import React from 'react'
import { Pagination } from 'antd'
import './Pages.css'

const Pages = (props) => {
  return (
    <div className='pagination'>
      <Pagination
        onChange={props.onChange}
        defaultCurrent={1}
        current={props.current}
        total={props.totalPages}
        hideOnSinglePage={true}
        showSizeChanger={false}
        defaultPageSize={20}
      />
    </div>
  )
}

export default Pages
