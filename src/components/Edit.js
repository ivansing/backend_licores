import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";




const Edit = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();



  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!category.trim()) {
      newErrors.category = "La categoría es requerida";
    }

    if (!price.toString().trim()) {
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

  const update = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});
      
      const product = doc(db, "products", id);
      const data = {
        name: name.trim(),
        category: category.trim(),
        price: parseFloat(price),
        imageUrl: imageUrl.trim(),
      };
      await updateDoc(product, data);
      navigate("/productos");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ submit: "Error al actualizar el producto. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      setErrors({});
      
      const product = await getDoc(doc(db, "products", id));
      if (product.exists()) {
        const data = product.data();
        setName(data.name || "");
        setCategory(data.category || "");
        setPrice(data.price?.toString() || "");
        setImageUrl(data.imageUrl || "");
      } else {
        setErrors({ fetch: "El producto no existe o fue eliminado." });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setErrors({ fetch: "Error al cargar el producto. Por favor intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

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
                    <h1>Editar Producto</h1>

                    {/* Fetch Error State */}
                    {errors.fetch && (
                      <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.fetch}
                        <div className="mt-2">
                          <button 
                            className="btn btn-outline-danger btn-sm me-2"
                            onClick={() => getProductById(id)}
                          >
                            Reintentar
                          </button>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => navigate("/productos")}
                          >
                            Volver a Productos
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-2 text-muted">Cargando datos del producto...</p>
                      </div>
                    ) : !errors.fetch && (
                      <form onSubmit={update}>
                        {errors.submit && (
                          <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
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
                                Actualizando...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-save me-2"></i>
                                Actualizar
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
                    )}
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

export default Edit;
