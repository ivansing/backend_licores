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
import Sidebar from "./Sidebar";

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
      
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
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
    </>
  );
};

export default Show;
