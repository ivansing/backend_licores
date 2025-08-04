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
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MySwal = withReactContent(Swal);

const Categorias = () => {
  //  Hooks
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to db firestore
  const categoryCollection = collection(db, "categories");

  //  Show all docs
  const getCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDocs(categoryCollection);
      setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Error al cargar las categorías. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Update Document

  // delete doc
  const deleteCategory = async (id) => {
    const categoryDoc = doc(db, "categories", id);
    await deleteDoc(categoryDoc);
    getCategory();
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
        deleteCategory(id);
        Swal.fire("Borrado!", "Este campo ha sido borrado.", "exitoso");
      }
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div>
        <Header />

        <div id="layoutSidenav">
          <Sidebar />

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <h1 className="mt-4">Categorias</h1>

                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <div className="d-grid gap-2">
                              <Link
                                to="/createCategory"
                                className="btn btn-secondary mt-2 mb-2"
                              >
                                Nueva Categoria
                              </Link>
                            </div>

                            {/* Error State */}
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                  className="btn btn-outline-danger btn-sm ms-2"
                                  onClick={getCategory}
                                >
                                  Reintentar
                                </button>
                              </div>
                            )}

                            {/* Loading State */}
                            {loading ? (
                              <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2 text-muted">Cargando categorías...</p>
                              </div>
                            ) : (
                              <table className="table table-light table-hover">
                                <thead>
                                  <tr>
                                    <th>Nombre</th>
                                    <th>URL Imagen</th>
                                    <th>Acciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {categories.length === 0 ? (
                                    <tr>
                                      <td colSpan="3" className="text-center py-4 text-muted">
                                        <i className="fas fa-folder-open fa-2x mb-2"></i>
                                        <p>No hay categorías disponibles</p>
                                        <Link to="/createCategory" className="btn btn-primary btn-sm">
                                          Crear primera categoría
                                        </Link>
                                      </td>
                                    </tr>
                                  ) : (
                                    categories.map((category) => (
                                      <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td className="text-truncate" style={{maxWidth: '250px'}}>
                                          {category.imageUrl}
                                        </td>
                                        <td>
                                          <div className="btn-group" role="group">
                                            <Link
                                              to={`/edit/${category.id}`}
                                              className="btn btn-outline-primary btn-sm"
                                              title="Editar"
                                            >
                                              <i className="fa-solid fa-pen"></i>
                                            </Link>
                                            <button
                                              onClick={() => confirmDel(category.id)}
                                              className="btn btn-outline-danger btn-sm"
                                              title="Eliminar"
                                            >
                                              <i className="fa-solid fa-trash"></i>
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorias;
