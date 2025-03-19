import React from 'react';
import { Link } from 'react-router-dom';  // Correct import for Link

import gymImage from './img/woman-gym.png';
import gymImage2 from './img/model-single.png';
import gymImage3 from './img/couple-model-2.png';
import icon from './img/favicon-32x32.png';

const Home = () => {
  return (
    <>
      <main>
        <section className="landing-page">
          <section className="hero">
            <div className="hero-content">
              <h1>Welcome to <br /> Full Strength Academy</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Corporis repellat aut natus dolorum perspiciatis? Dolorum,
                error impedit amet sed quo illum rem architecto accusantium
                quae expedita eligendi libero dolorem nam!</p>

              <Link to="/register">
                <button className="btn">Sign Up Today!</button>
              </Link>
            </div>
          </section>

          <section className="membership" id="services">
            <h2>What we offer at Fullstrength</h2>
            <div className="membership-info">
              <div className="plans">
                <img src={gymImage2} alt="Membership couples-gym" />
                <p><strong>Custom Meal Plans</strong></p>
              </div>

              <div className="plans">
                <img src={gymImage} alt="Membership couples-gym" />
                <p><strong>Custom Exercise Plans</strong></p>
              </div>

              <div className="plans">
                <img src={gymImage3} alt="Membership couples-gym" />
                <p><strong>Custom Workout Tracking</strong></p>
              </div>
            </div>

            {/* ENGLE PLEASE CENTER THIS BUTTON ON OUR PAGE!*/}
            <div className="learn-more-button">
              <Link to="/learn-more">
                <button className="btn">CLICK HERE TO LEARN ABOUT HOW WE MADE OUR APP!</button>
              </Link>
            </div>
          </section>

          <section className="about-section">
            <div className="about-container">
              <h2>About Our Services</h2>
              <p>
                We offer customized workout routines and meal plans designed to help you reach your fitness goals.
                Whether you're interested in group classes or one-on-one personal training, we provide a variety
                of subscription options to fit your lifestyle. Plus, we'll track your progress every step of the
                way to ensure you stay on the path to success.
              </p>
              <p>
                Our professional trainers are dedicated to providing top-notch guidance and support.
                Explore our affordable packages and start your fitness journey today!
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-container">
              <h2>Contact us  <br /> Team: Dev All Stars⭐⭐⭐⭐⭐</h2>
              <p>
                We are the dynamic team behind this project, known as "Full Strength Academy" Together, we combine our expertise in design, development, and user experience to deliver high-quality solutions that meet your needs.
              </p>
              <div className="team-cards">
                <div className="team-card">
                  <h3>Joe  <img src={icon} alt="bunny" /></h3>
                  <p>Full-stack developer Focuses on project management and ensuring quality control, Backend expert, responsible for database management and APIs.</p>
                </div>
                <div className="team-card">
                  <h3>Shaun  <img src={icon} alt="bunny" /></h3>
                  <p>Full-stack developer Backend expert, responsible for database management and APIs. Expert problem soluction consultant</p>
                </div>
                <div className="team-card">
                  <h3>Brianna <img src={icon} alt="bunny" /></h3>
                  <p>Full-stack developer Focuses on project management and ensuring quality control, Backend Expert and APIs. Expert problem soluction consultant</p>
                </div>
                <div className="team-card">
                  <h3>Engel <img src={icon} alt="bunny" /></h3>
                  <p>Full-stack developer with a passion for bringing creative ideas to life. Backend Expert and APIs. Expert problem soluction consultant</p>
                </div>
              </div>
              <p>
                Our goal is to create intuitive, robust, and scalable products. From concept to completion, we work collaboratively to ensure everything is developed with precision and creativity.
              </p>
              <p>
                With each of us specializing in different areas of development, we offer a well-rounded approach to crafting projects that leave a lasting impact.
              </p>
            </div>
          </section>

          <footer className="footer">
            <li>&copy; CopyRight | Full Strength Academy  |  2025 </li>
          </footer>
        </section>
      </main>
    </>
  );
}

export default Home;
