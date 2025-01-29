import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import General from './General.jsx'
import Education from './Education.jsx'
import Experience from './Experience.jsx'


function Header() {
  return (
    <header>
      <img src={reactLogo} className="react-logo" alt="React logo" />
      <h2>CV Maker 1.0</h2>
    </header>
  );
}


function Main() {
  return (
    <main>
      <h3>Main Section</h3>
      <General />
      <Education />
      <Experience />      
    </main>
  );
}


function App() {
  return (
    <>
      <Header />
      <Main />
      <footer>
        CV Maker v1.0 Copyright 2025
      </footer>
        
    </>
  )
}

export default App
