import "./Features.css";

function Features() {
  return (
    <section className="features" id="features">

      <h2 className="features-title">Platform Features</h2>

      <div className="features-container">

        <div className="feature-card">
          <div className="feature-icon blue">📝</div>

          <div className="feature-content">
            <h3>Problem Reporting</h3>
            <p>
              Citizens can report local issues with images,
              location and detailed descriptions.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon green">🤖</div>

          <div className="feature-content">
            <h3>AI-Powered Analysis</h3>
            <p>
              AI categorizes problems, removes duplicates
              and suggests priority levels.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon purple">👥</div>

          <div className="feature-content">
            <h3>Community Challenges</h3>
            <p>
              Similar issues are grouped into challenges
              for collaborative problem solving.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon orange">🎯</div>

          <div className="feature-content">
            <h3>Smart Matching</h3>
            <p>
              Challenges are matched with universities
              and industries for innovative solutions.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon cyan">🤝</div>

          <div className="feature-content">
            <h3>Collaboration</h3>
            <p>
              Universities, industries and authorities
              work together on selected projects.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon navy">🏛️</div>

          <div className="feature-content">
            <h3>Authority Oversight</h3>
            <p>
              Government authorities monitor, verify
              and approve implementation progress.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon pink">📊</div>

          <div className="feature-content">
            <h3>Analytics Dashboard</h3>
            <p>
              Track reports, projects, challenges
              and impact with real-time analytics.
            </p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon teal">🔔</div>

          <div className="feature-content">
            <h3>Real-Time Notifications</h3>
            <p>
              Receive instant updates about
              reported problems and project status.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Features;
