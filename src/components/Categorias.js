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

  // Ref to db firestore
  const categoryCollection = collection(db, "categories");

  //  Show all docs
  const getCategory = async () => {
    const data = await getDocs(categoryCollection);

    setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(category);
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
              <div class="container-fluid">
                <h1 class="mt-4">Categorias</h1>

                <div class="container">
                  <div class="row">
                    <div class="col-lg-6">
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
                            <table className="table table-light table-hover">
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>URL Imagen</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories.map((category) => (
                                  <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.imageUrl}</td>
                                    <td>
                                      <Link
                                        to={`/edit/${category.id}`}
                                        className="btn btn-light"
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                      </Link>
                                      <button
                                        onClick={() => confirmDel(category.id)}
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

export default Categorias;
