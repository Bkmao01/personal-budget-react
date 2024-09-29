import React from 'react';
import './App.scss';
import Menu from './Menu/Menu'
import Hero from './Hero/Hero';
import Homepage from './Homepage/Homepage';
import Footer from './Footer/Footer';
import './index.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className="mainContainer">
        <Routes>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<Homepage />} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
