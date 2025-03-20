import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <>
      <main>
        <section className="landing-page">
          <section className="hero">
            <div className="hero-content">
              <h1>Your Virtual Training <br /> Partner Has Arrived</h1>
              <p>Full Strength Academy is a cutting-edge fitness app designed 
                to help users achieve their strength, endurance, and wellness goals 
                through personalized workout and nutrition plans and tracking. Whether 
                you are looking to build muscle, lose fat, or enhance athletic performance, 
                this is the tool you need to succeed.
              </p>

              { !token ? 
                ( <Link to="/register"><button className="btn">Get Started Today!</button></Link> ) 
                : 
                ( <Link to="/profile"><button className="btn">Continue On Your Journey</button></Link> )
              }

            </div>
          </section>

          <footer className="footer">
            &copy; Full Strength Academy, 2025 | All-Star Team | Joe Callahan | Brianna Stephens | Engel Noel Berihuete | Shaun Newman |
              <Link to="learn-more">Take a Look Behind the Scenes</Link>
          </footer>
        </section>
      </main>
    </>
  )
}

export default Home;