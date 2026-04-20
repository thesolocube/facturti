import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="app">
    <Sidebar />
    <div className="main">{children}</div>
  </div>
);

export default Layout;
