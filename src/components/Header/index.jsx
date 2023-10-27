import React from 'react'
import { menu } from 'config'
import { Header } from './style/style'
function index() {
  return (
    <Header>
      <nav >
        <div className='flex gap-4'>
          <div className=" w-8 h-8">
            <img src='/images/logo.jpg' alt="logo" />
          </div>
          <div>
            
          </div>
        </div>
        
      </nav>
    </Header>
  )
}

export default index