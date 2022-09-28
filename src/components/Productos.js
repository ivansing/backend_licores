import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import  { getProductById, update } from "./Edit";
import { Switch } from "@mui/material";

const MySwal = withReactContent(Swal);

const Productos = () => {
  //  Hooks
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState([]);

  // Ref to db firestore
  const productsCollection = collection(db, "products");

  //  Show all docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(products);
  };

  // Toggle button isPopular
  
  const docRef = doc(db, 'products', 'isPopular');
  const docSnap =  getDoc(docRef);

  //console.log(docSnap.data())

    
  

  // Toggle button isRecommended
  const toggleIsRecommended = async (id) => {
    const recoRef = doc(db, "products", id);
    const recoSnap = await getDoc(recoRef);

    if (recoSnap.exists()) {
      toggle ? setToggle(false) : setToggle(true)
    } else {
      console.log("No existe");
    }
  };

  // Update Document
  // TODO reading id but hot showing the Edit page

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
              <div class="container-fluid">
                <h1 class="mt-4">Productos</h1>

                <div class="container">
                  <div class="row">
                    <div class="col-lg-6">
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
                            <table className="table table-light table-hover">
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Categoria</th>
                                  <th>Precio</th>
                                  <th>URL Imagen</th>
                                  <th>Populares</th>
                                  <th>Recomendados</th>
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
                                      <p>{product.isPopular}</p>
                                    </td>

                                    <td>
                                      <Switch
                                        onClick={() =>
                                          toggleIsRecommended(product.id)
                                        }
                                      />
                                      {toggle ? <span>Prendido</span> : <span>Apagado</span>}
                                    </td>

                                    <td>
                                      <Link
                                        onClick={() => update(getProductById(product.id))}
                                        to={'/edit'}
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

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;
