import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";

const MySwal = withReactContent(Swal);

const Show = () => {
  //  Hooks
  const [products, setProducts] = useState([]);

  // Ref to db firestore
  const productsCollection = collection(db, "products");

  //  Show all docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(products);
  };

  // Update Document

  // delete doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  // Confirm Delete Alert
  const confirmDel = (id) => {
    MySwal.fire({
      title: "¿Estas Seguro?",
      text: "No podras revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call delete Product
        deleteProduct(id);
        Swal.fire("Borrado!", "Este campo ha sido borrado.", "exitoso");
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Show Table
  return (
    <>
      <div>
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
                    <a class="dropdown-item" id="logout" href="login.html">
                      Salir
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div id="layoutSidenav">
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
          <div id="layoutSidenav_content">
            <main>
              <div class="container-fluid">
                <h1 class="mt-4">Productos</h1>

                <div class="container">
                  <div class="row">
                    <div class="col-lg-6">
                      {/*  <!-- Button trigger modal --> */}

                      {/*  <!-- Modal --> */}
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Agregar Producto
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">...</div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Cerrar
                              </button>
                              <button type="button" class="btn btn-primary">
                                Guardar Cambios
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Body Products Catalog --> */}

                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <div className="d-grid gap-2">
                              <Link
                                to="/create"
                                className="btn btn-secondary mt-2 mb-2"
                              >
                                Nuevo Producto
                              </Link>
                            </div>
                            <table className="table table-dark table-hover">
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Categoria</th>
                                  <th>Precio</th>
                                  <th>URL Imagen</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((product) => (
                                  <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.imageUrl}</td>
                                    <td>
                                      <Link
                                        to={`/edit/${product.id}`}
                                        className="btn btn-light"
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                      </Link>
                                      <button
                                        onClick={() => confirmDel(product.id)}
                                        className="btn btn-danger"
                                      >
                                        <i className="fa-solid fa-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
              <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-between small">
                  <div class="text-muted">Derechos &copy; Pagina Web 2022</div>
                  <div>
                    <a href="#">Politica de privacidad</a>
                    &middot;
                    <a href="#">Terminos &amp; Condiciones</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
export default Show;
