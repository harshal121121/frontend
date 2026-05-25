import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";

const features = [
  {
    icon: "🛡️",
    title: "Overall Dashboard ",
    desc: "Track code coverage, AI risk analysis, and build performance in real time.",
    link: "Explore Dashboard →",
    to: "/dashboard",
    featured: true,
  },
  {
    icon: "📊",
    title: "Coverage Analysis",
    desc: "Drill into line, branch, and function coverage across every module with beautiful visual breakdowns.",
    link: "Explore Coverage →",
    to: "/coverage",
    featured: true,
  },
  {
    icon: "🤖",
    title: "AI Risk Analysis",
    desc: "LLM-powered risk scoring surfaces dangerous uncovered code paths before they hit production.",
    link: "Explore Risk Analysis →",
    to: "/ai-risk",
  },
  {
    icon: "🔨",
    title: "Builds & Reports",
    desc: "Historical build analytics across repositories and CI/CD pipelines — always up to date.",
    link: "Explore Builds →",
    to: "/builds",
  },
  
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />

        <p className="hero-tag">AI-POWERED PLATFORM</p>

        <h1>
          Code Coverage &amp; Quality
          <br />
          <span className="accent-word">Intelligence</span>
        </h1>

        <p className="hero-sub">
          AI-powered code coverage and build analytics platform for modern CI/CD pipelines.
          Detect uncovered critical paths, monitor build quality, and generate intelligent risk insights using RAG + LLM analysis.
        </p>

        {/* <div className="hero-cta">
          <button className="btn-primary" onClick={() => navigate("/coverage")}>
            Explore Coverage
          </button>
          <button className="btn-secondary" onClick={() => navigate("/builds")}>
            View Builds
          </button>
        </div> */}


      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="section-header">
          <p className="section-label">CAPABILITIES</p>
          <h2>How we can help</h2>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div
              key={f.title}
              className={`feature-card${f.featured ? " featured" : ""}`}
              onClick={() => navigate(f.to)}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="feature-link">{f.link}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;