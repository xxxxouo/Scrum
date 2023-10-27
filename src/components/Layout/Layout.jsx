import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

function Layout({children}) {
  return (
    <div className='layout_wrap'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout