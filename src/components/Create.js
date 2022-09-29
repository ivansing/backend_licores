import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const productsRef = collection(db, "products");
  const save = async (e) => {
    e.preventDefault();
    await addDoc(productsRef, {
      name: name,
      category: category,
      price: price,
      imageUrl: imageUrl,
    });
    navigate("/");
    //console.log(e.target[0].value)
  };

  return (
    <div>
      <Header />

      <div id="layoutSidenav">
        <Sidebar />

        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h1>Crear Producto</h1>

                    <form onSubmit={save}>
                      <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <input
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Grabar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Create;
