import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Hello!</h1>
      <Outlet />
    </>
  )
}

export default App
