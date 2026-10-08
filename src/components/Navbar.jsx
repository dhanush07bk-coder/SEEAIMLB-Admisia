import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">

      <h2>
        🎓 Admisia
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/application">
          Apply
        </Link>

        <Link to="/status">
          Status
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/login">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;