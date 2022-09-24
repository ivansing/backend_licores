import React from 'react'
import Auth from '../auth/Auth'

const Header = () => {
  return (
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a class="navbar-brand" href="index.html">
            Tu página
          </a>
          <button
            class="btn btn-link btn-sm order-1 order-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i class="fas fa-bars"></i>
          </button>

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
                    <a class="dropdown-item" href="#">
                      Cuenta
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" id="logout" href="auth/Auth.js">
                      Salir
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
  )
}

export default Header