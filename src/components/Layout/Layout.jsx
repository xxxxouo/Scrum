import React, { Fragment } from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'

function Layout({children}) {
  const location = useLocation()
  return (
    <div className='layout_wrap'>
      <Header />
      <main className='flex'>
        {
          location.pathname !== '/project' &&
          <SideBar />
        }
        <Outlet />
      </main>
        
      
    </div>
  )
}

export default Layout