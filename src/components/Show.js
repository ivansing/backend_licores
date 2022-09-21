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
    console.log(products);
  };

  // delete doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  // TODO confirm alert

  // TODO useEffect
  useEffect(() => {
    getProducts();
  }, []);

  // Show Table

  return (
    (<div></div>),
    (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-grid gap-2">
                <Link to={"/create"} className="btn btn-secondary mt-2 mb-2">
                  Nuevo Producto
                </Link>
              </div>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Categorias</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>URL Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.category}</td>
                      <td>{product.name}</td>
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
                          onClick={() => deleteProduct(product.id)}
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
    )
  );
};

export default Show;
