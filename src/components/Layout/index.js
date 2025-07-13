import './index.scss';
import React from 'react';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='App'>
      <Sidebar/>
      <div className='page'>
        <span className='tags top-tags'></span>

        <Outlet/>
        <span className='tags bottom-tags'>
          
          <br/>
          <span className='bottom-tag-html'></span>
        </span>
      </div>
    </div>
  )
}

export default Layout