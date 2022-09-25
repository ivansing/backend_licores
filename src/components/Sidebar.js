import React from 'react'

const Sidebar = () => {
  return (
    
    <div id="layoutSidenav_nav">
    <nav
      class="sb-sidenav accordion sb-sidenav-dark"
      id="sidenavAccordion"
    >
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Principal</div>
          <a class="nav-link" href="index.html">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Panel
          </a>
          <div class="sb-sidenav-menu-heading">Tienda</div>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div class="sb-nav-link-icon">
              <i class="fas fa-columns"></i>
            </div>
            Paginas
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-parent="#sidenavAccordion"
          >
            <nav class="sb-sidenav-menu-nested nav">
              <a class="nav-link" href="layout-static.html">
                Producto
              </a>
              <a class="nav-link" href="layout-sidenav-light.html">
                Categorias
              </a>
            </nav>
          </div>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="false"
            aria-controls="collapsePages"
          >
            <div class="sb-nav-link-icon">
              <i class="fas fa-book-open"></i>
            </div>
            Clientes
            <div class="sb-sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            class="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-parent="#sidenavAccordion"
          >
            <nav
              class="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            >
              <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#pagesCollapseAuth"
                aria-expanded="false"
                aria-controls="pagesCollapseAuth"
              >
                Datos
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="pagesCollapseAuth"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordionPages"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="login.html">
                    Ingresar
                  </a>
                  <a class="nav-link" href="register.html">
                    Registrar
                  </a>
                  <a class="nav-link" href="password.html">
                    Olvidaste tu clave
                  </a>
                </nav>
              </div>
              <a
                class="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#pagesCollapseError"
                aria-expanded="false"
                aria-controls="pagesCollapseError"
              >
                Compras
                <div class="sb-sidenav-collapse-arrow">
                  <i class="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                class="collapse"
                id="pagesCollapseError"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordionPages"
              >
                <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="401.html">
                    401 Pagina
                  </a>
                  <a class="nav-link" href="404.html">
                    404 Pagina
                  </a>
                  <a class="nav-link" href="500.html">
                    500 Pagina
                  </a>
                </nav>
              </div>
            </nav>
          </div>
        </div>
        <div class="sb-sidenav-footer">
          <div class="small">Ingresado como:</div>
          Usuario
        </div>
      </div>
    </nav>
  </div>
          
    
  )
}

export default Sidebar