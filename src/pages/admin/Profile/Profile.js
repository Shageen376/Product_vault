import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header text-center">
        <h1>Investing For Outliers.</h1>
        <p>Invest your spare change in Bitcoin and other crypto to earn interest and grow over time.</p>
        <button className="btn btn-light">Get Started</button>
      </header>

      {/* Statistics Section */}
      <section className="profile-statistics d-flex justify-content-center">
        <div className="stat-card">
          <h2>$3500</h2>
          <p>Account Balance</p>
        </div>
        <div className="stat-card">
          <h2>67%</h2>
          <p>Portfolio Growth</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="profile-features">
        <div className="feature-card">
          <div className="feature-icon">🏦</div>
          <h3>Connect Your Bank</h3>
          <p>Invest on a regular basis and grow your wealth.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Pick Your Assets</h3>
          <p>Choose the assets that align with your risk tolerance.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Cash Out Anytime</h3>
          <p>Withdraw your funds whenever you need them.</p>
        </div>
      </section>

      {/* Investment Advice Section */}
      <section className="investment-advice text-center">
        <h2>Invest Like An Outlier.</h2>
        <p>Take control of your future by investing in assets that matter to you. Start small, grow over time.</p>
      </section>
    </div>
  );
}

export default Profile;
