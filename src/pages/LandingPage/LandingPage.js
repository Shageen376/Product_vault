import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Best Store</h1>
        <p>
          GRAB YOUR OPPORTUNITIES TO START WITH BEST OF BUSINESS CAREER
        </p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
