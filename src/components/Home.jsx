import React from 'react'

import gymImage from './img/woman-gym.png';
import gymImage2 from './img/model-single.png';
import gymImage3 from './img/couple-model-2.png';
import icon from './img/favicon-32x32.png'

const Home = () => {

  return (
    <>
      <main>
        <section className="landing-page">
          <header className="navbar">
            <div className="brand">FITNESS</div>
            <nav>
              <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </nav>
          </header>
          <center>
            <section className="hero">

              <div className="hero-content">
                <h1>Welcome to <br /> Full Strength Academy</h1>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Corporis repellat aut natus dolorum perspiciatis? Dolorum,
                  error impedit amet sed quo illum rem architecto accusantium
                  quae expedita eligendi libero dolorem nam!</p>

                <button className="btn">Explore more</button>
              </div>
            </section>

            <center>
              <section className="membership" id="services">
                <h2>Membership Plans</h2>
                <div className="membership-info">
                  <div className="plans">
                    <img src={gymImage2} alt="Membership couples-gym" />
                    <p><strong>Basic:</strong> $30/month</p>
                    <button className="btn">Join Now</button>
                  </div>

                  <div className="plans">
                    <img src={gymImage} alt="Membership couples-gym" />
                    <p><strong>Standard:</strong> $50/month (Includes group classes)</p>
                    <button className="btn">Join Now</button>
                  </div>

                  <div className="plans">
                    <img src={gymImage3} alt="Membership couples-gym" />
                    <p><strong>Premium:</strong> $70/month (Includes personal training)</p>
                    <button className="btn">Join Now</button>
                  </div>
                </div>
              </section>
            </center>

            <center>

              <section class="about-section">
                <div class="about-container">
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
            </center>
          </center>
          <section>

          <section class="about-section">
  <div class="about-container">
    <h2>Contact us  <br /> Team: Devs All Stars⭐⭐⭐⭐</h2>
    <p>
      We are the dynamic team behind this project, known as "Full Strength Academy" Together, we combine our expertise in design, development, and user experience to deliver high-quality solutions that meet your needs.
    </p>
    <div class="team-cards">
      <div class="team-card">
        <h3>Joe  <img src={icon} alt="bunny" /></h3>
        <p>Full-stack developer Focuses on project management and ensuring quality control, Backend expert, responsible for database management and APIs.</p>
      </div>
      <div class="team-card">
        <h3>Shaun  <img src={icon} alt="bunny" /></h3>
        <p>Full-stack developer Backend expert, responsible for database management and APIs. Expert problem soluction consultan</p>
      </div>
      <div class="team-card">
        <h3>Brianna <img src={icon} alt="bunny" /></h3>
        <p>Full-stack Focuses on project management and ensuring quality control, Backend Expert and APIs. Expert problem soluction consultan</p>
      </div> 
      <div class="team-card">
        <h3>Engel <img src={icon} alt="bunny" /></h3>
        <p>Full-stack developer with a passion for bringing creative ideas to life. Backend Expert and APIs. Expert problem soluction consultan</p>
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
        </section>

      </main>

    </>
  )
}

export default Home