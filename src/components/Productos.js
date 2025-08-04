import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Switch } from "@mui/material";

const MySwal = withReactContent(Swal);

const Productos = () => {
  //  Hooks
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref to db firestore
  const productsCollection = collection(db, "products");

  //  Show all docs
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error al cargar los productos. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle button isPopular
  const toggleIsPopular = async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const currentData = productSnap.data();
      const newIsPopular = !currentData.isPopular;
      
      await updateDoc(productRef, {
        isPopular: newIsPopular
      });
      
      // Refresh products list
      getProducts();
    } else {
      console.log("Product does not exist");
    }
  };

  // Toggle button isRecommended
  const toggleIsRecommended = async (id) => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const currentData = productSnap.data();
      const newIsRecommended = !currentData.isRecommended;
      
      await updateDoc(productRef, {
        isRecommended: newIsRecommended
      });
      
      // Refresh products list
      getProducts();
    } else {
      console.log("Product does not exist");
    }
  };


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

  return (
    <>
      <div>
        <Header />

        <div id="layoutSidenav">
          <Sidebar />

          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid align-items-center">
                <h1 className="mt-4">Productos</h1>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
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

                            {/* Error State */}
                            {error && (
                              <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {error}
                                <button 
                                  className="btn btn-outline-danger btn-sm ms-2"
                                  onClick={getProducts}
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
                                <p className="mt-2 text-muted">Cargando productos...</p>
                              </div>
                            ) : (
                              <table className="table table-light table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">URL Imagen</th>
                                    <th scope="col">Populares</th>
                                    <th scope="col">Recomendados</th>
                                    <th scope="col">Acciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {products.length === 0 ? (
                                    <tr>
                                      <td colSpan="7" className="text-center py-4 text-muted">
                                        <i className="fas fa-box-open fa-2x mb-2"></i>
                                        <p>No hay productos disponibles</p>
                                        <Link to="/create" className="btn btn-primary btn-sm">
                                          Crear primer producto
                                        </Link>
                                      </td>
                                    </tr>
                                  ) : (
                                    products.map((product) => (
                                      <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td className="text-truncate" style={{maxWidth: '200px'}}>
                                          {product.imageUrl}
                                        </td>

                                        <td>
                                          <Switch
                                            checked={product.isPopular || false}
                                            onChange={() =>
                                              toggleIsPopular(product.id)
                                            }
                                          />
                                          <span className="ms-2">
                                            {product.isPopular ? "Sí" : "No"}
                                          </span>
                                        </td>

                                        <td>
                                          <Switch
                                            checked={product.isRecommended || false}
                                            onChange={() =>
                                              toggleIsRecommended(product.id)
                                            }
                                          />
                                          <span className="ms-2">
                                            {product.isRecommended ? "Sí" : "No"}
                                          </span>
                                        </td>

                                        <td>
                                          <div className="btn-group" role="group">
                                            <Link
                                              to={`/edit/${product.id}`}
                                              className="btn btn-outline-primary btn-sm"
                                              title="Editar"
                                            >
                                              <i className="fa-solid fa-pen"></i>
                                            </Link>
                                            <button
                                              onClick={() => confirmDel(product.id)}
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

export default Productos;
