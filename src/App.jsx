import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function Header() {
  return (
    <header>
      <img src={reactLogo} className="react-logo" alt="React logo" />
      <h2>CV Maker 1.0</h2>
    </header>
  );
}



function App() {
  return (
    <>
      <Header />
      <main>
        <h3>Main Section</h3>
      </main>
      <footer>
        CV Maker v1.0 Copyright 2025
      </footer>
        
    </>
  )
}

export default App
