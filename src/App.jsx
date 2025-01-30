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
      <h2>CV Maker App</h2>
    </header>
  );
}


function Main() {
  const onSubmit = (e) => {
    // get form input from local storage
    const general_details = JSON.parse(localStorage.getItem('general_details'));
    const education_details = JSON.parse(localStorage.getItem('education_details'));
    const experience_details = JSON.parse(localStorage.getItem('experience_details'));

    console.log("Form Submitted!");
    console.log("general details", general_details);
    console.log("education details", education_details);
    console.log("experience details", experience_details);

  };
  
  return (
    <main>
      <General />
      <Education />
      <Experience />   
      <button id="submit-button" onClick={onSubmit}>Submit</button>  
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
