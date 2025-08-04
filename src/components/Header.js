import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <h1>Cargandose</h1>;

  return (
    <nav className="sb-topnav navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Panel Administrativo
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0"
        id="sidebarToggle"
        href="#"
      >
        <i className="fas fa-bars"></i>
      </button>

      <ul className="navbar-nav  d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        <li className="nav-item dropdown">
          <div className="btn-group">
            <a
              className="nav-link dropdown-toggle btn btn-secondary"
              id="userDropdown"
              href="myModal"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item" to="/register">
                  Cuenta
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  onClick={handleLogout}
                  id="logout"
                  /* to="/login" */
                >
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
