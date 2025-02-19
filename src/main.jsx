import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import MainMenu from './views/MainMenu.jsx'
import Rules from './views/Rules.jsx'
import Play from './views/Play.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMenu />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/play/*' element={<Play />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
