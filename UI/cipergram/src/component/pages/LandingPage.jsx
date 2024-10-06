import React, { useState } from 'react';
import '../../assets/css/LandingPage.css';
import logoImg from '../../assets/images/logo.jpg'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigate = useNavigate();

  return (
    <div className={`landing-big-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        <div className="landing-container">
          <div className="landing-navbar">
            <div className="landing-navbar-logo">
              <img src={logoImg} alt="Logo" />
              <h3>Danvo in a new branch</h3>
            </div>
            <div className="landing-navbar-links">
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Testimonials</a></li>
                <li onClick={()=>navigate("/login")}><a href="" className="landing-btn">Sign in</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="landing-showcase-area">
        <div className="landing-container">
          <div className="landing-left">
            <div className="landing-big-title">
              <h1>Future is here,</h1>
              <h1>Start Exploring now.</h1>
            </div>
            <p className="landing-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Delectus eius distinctio odit, magni magnam qui ex perferendis
              vitae!
            </p>
            <div className="landing-cta">
              <a onClick={()=>navigate("/login")} href="#" className="landing-btn">Get started</a>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-bottom-area">
        <div className="landing-container">
          <button className="landing-toggle-btn" onClick={toggleTheme}>
            <i className="far fa-moon"></i>
            <i className="far fa-sun"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
