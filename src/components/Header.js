import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";



const Header = () => {



 const {   logout, loading } = useAuth();
  const navigate = useNavigate();

 const handleLogout = async () => {
    await logout();
    navigate("/login");
  }; 

  if(loading) return <h1>Cargandose</h1>

  return (
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link class="navbar-brand" to="/">
        Panel Administrativo 
      </Link>
      {/* <button
        class="btn btn-link btn-sm order-1 order-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i class="fas fa-bars"></i>
      </button> */}

      <ul class="navbar-nav d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        <li class="nav-item dropdown">
          <div class="btn-group">
            <a
              class="nav-link dropdown-toggle"
              className="btn btn-secondary dropdown-toggle"
              id="userDropdown"
              href="myModal"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user fa-fw"></i>
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
