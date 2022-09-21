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

    setProducts(data.docs.map((doc) => ({ id: doc.id })));
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
      <h1>
        {products.map((product) => (
          <p>{product.getProducts}</p>
        ))}
      </h1>
    )
  );
};

export default Show;
