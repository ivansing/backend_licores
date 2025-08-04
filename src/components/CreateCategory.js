import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const categoryRef = collection(db, "categories");

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
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
      
      await addDoc(categoryRef, {
        name: name.trim(),
        imageUrl: imageUrl.trim(),
      });
      navigate("/categorias");
    } catch (error) {
      console.error("Error creating category:", error);
      setErrors({ submit: "Error al crear la categoría. Intenta de nuevo." });
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
                    <h1>Crear Categoria</h1>

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
                              Crear Categoría
                            </>
                          )}
                        </button>
                        
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => navigate("/categorias")}
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

export default CreateCategory;
