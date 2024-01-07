import React from 'react'
import Auth from './components/Auth'
import Home from './components/Home'
import { Routes ,Route } from 'react-router-dom'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}
