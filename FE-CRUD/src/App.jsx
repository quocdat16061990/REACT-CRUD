import { useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Users from './features/Users/Users';
import UserForm from './features/Users/UserForm';

import './App.css'

function App() {
  const navItems  = [
    { path: '/users', label: 'List User', component: <Users/> },
    {path : '/users/add' , label : 'Add User' , component : <UserForm/>},
    {path : '/users/edit/:id' , label : 'Edit User' , component : <UserForm/>}
  ];

  return (
    <BrowserRouter>
    <div>
    <nav>
      <ul className="user">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link className='custom' to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <Routes>
      {navItems.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Routes>
  </div>

</BrowserRouter>
  )
}

export default App
