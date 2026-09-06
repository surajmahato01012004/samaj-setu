import "./Home.css";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-left">

          <p className="hero-tag">
            CIVIC INTELLIGENCE • COLLABORATION • IMPACT
          </p>

          <h1>
            <span className="green">Your Voice.</span>
            <br />
            <span className="purple">Our Network.</span>
            <br />
            <span className="dark">Real Impact.</span>
          </h1>

          <p className="hero-text">
            SamajSetu turns scattered community problems into
            structured, actionable challenges — connecting
            citizens, authorities, universities and industries
            to solve them together.
          </p>

          <div className="hero-buttons">

            <button className="report-btn">
              + Report a Problem
            </button>

            <button className="explore-btn">
              Explore Solutions →
            </button>

          </div>

        </div>

        <div className="hero-right">
          <img src={heroImage} alt="SamajSetu" />
        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section className="stats">

        <div className="stats-card">
          <h2>24</h2>
          <p>Problems Reported</p>
        </div>

        <div className="stats-card">
          <h2>8</h2>
          <p>Community Challenges</p>
        </div>

        <div className="stats-card">
          <h2>5</h2>
          <p>Projects in Progress</p>
        </div>

        <div className="stats-card">
          <h2>11</h2>
          <p>Problems Resolved</p>
        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-about">

            <h2>✨ SamajSetu</h2>

            <p className="footer-tagline">
              Bridging Problems to Solutions
            </p>

            <p className="footer-desc">
              Building a smarter, inclusive and collaborative society.
            </p>

          </div>

          <div className="footer-links">

            <h3>Platform</h3>

            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">How it Works</a></li>
              <li><a href="/">Challenges</a></li>
              <li><a href="/">Projects</a></li>
            </ul>

          </div>

          <div className="footer-links">

            <h3>Stakeholders</h3>

            <ul>
              <li><a href="/">Citizens</a></li>
              <li><a href="/">Authorities</a></li>
              <li><a href="/">Universities</a></li>
              <li><a href="/">Industry</a></li>
            </ul>

          </div>

          <div className="footer-links">

            <h3>Support</h3>

            <ul>
              <li><a href="/">Help Center</a></li>
              <li><a href="/">FAQs</a></li>
              <li><a href="/">Terms</a></li>
              <li><a href="/">Contact</a></li>
            </ul>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;