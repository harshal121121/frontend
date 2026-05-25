import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="navbar">

        {/* LOGO SECTION */}

        <div className="logo-wrap">

          <div className="logo-box">
            &lt;/&gt;
          </div>

          <div className="logo-text">

            <h2>
              CodeQuality AI
            </h2>

            <p>
              Coverage Platform
            </p>

          </div>

        </div>

        {/* NAVIGATION LINKS */}

        <div className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/coverage"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Coverage Analysis
          </NavLink>

          <NavLink
            to="/ai-risk"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            AI Risk Analysis 
          </NavLink>

          <NavLink
            to="/builds"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Build Report
          </NavLink>

        </div>

        {/* RIGHT SECTION */}

        <div className="nav-right">

          <button
            className="theme-btn"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

        </div>

      </nav>
    </>
  );
};

export default Navbar;