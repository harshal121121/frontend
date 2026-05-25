const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <h3>CodeQuality AI</h3>
        <p>
          AI-powered code coverage and quality
          analysis for modern engineering teams.
          Ship with confidence.
        </p>
      </div>

      <div className="footer-col">
        <h4>PRODUCT</h4>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Documentation</a>
        <a href="#">API Reference</a>
      </div>

      <div className="footer-col">
        <h4>COMPANY</h4>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </div>

      <div className="footer-col">
        <h4>SUPPORT</h4>
        <a href="#">Help Center</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Security</a>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© 2026 CodeQuality AI. All rights reserved.</span>
      <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
        Built for modern engineering teams
      </span>
    </div>
  </footer>
);

export default Footer;