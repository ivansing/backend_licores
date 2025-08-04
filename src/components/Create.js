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
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const productsRef = collection(db, "products");

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!category.trim()) {
      newErrors.category = "La categoría es requerida";
    }

    if (!price.trim()) {
      newErrors.price = "El precio es requerido";
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = "El precio debe ser un número mayor a 0";
    }

    if (!imageUrl.trim()) {
      newErrors.imageUrl = "La URL de imagen es requerida";
    } else if (!isValidUrl(imageUrl)) {
      newErrors.imageUrl = "La URL de imagen no es válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const save = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});
      
      await addDoc(productsRef, {
        name: name.trim(),
        category: category.trim(),
        price: parseFloat(price),
        imageUrl: imageUrl.trim(),
        isPopular: false,
        isRecommended: false,
      });
      navigate("/productos");
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({ submit: "Error al crear el producto. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      <div id="layoutSidenav">
        <Sidebar />

        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h1>Crear Producto</h1>

                    <form onSubmit={save}>
                      {errors.submit && (
                        <div className="alert alert-danger" role="alert">
                          {errors.submit}
                        </div>
                      )}

                      <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          disabled={submitting}
                          required
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Categoria</label>
                        <input
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          type="text"
                          className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                          disabled={submitting}
                          required
                        />
                        {errors.category && (
                          <div className="invalid-feedback">
                            {errors.category}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          step="0.01"
                          min="0"
                          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                          disabled={submitting}
                          required
                        />
                        {errors.price && (
                          <div className="invalid-feedback">
                            {errors.price}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          type="url"
                          className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                          disabled={submitting}
                          required
                        />
                        {errors.imageUrl && (
                          <div className="invalid-feedback">
                            {errors.imageUrl}
                          </div>
                        )}
                      </div>

                      <div className="d-flex gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Creando...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>
                              Crear Producto
                            </>
                          )}
                        </button>
                        
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => navigate("/productos")}
                          disabled={submitting}
                        >
                          <i className="fas fa-times me-2"></i>
                          Cancelar
                        </button>
                      </div>
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
